import React, { useState } from 'react';
import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import MaterialCard from './MaterialCard';
import MaterialForm from './MaterialForm';
import './StudyMaterials.css';
import SemForm from './semForm';

const StudyMaterials = () => {
  const { studyMaterials, addStudyMaterial } = useApp();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [openSemForm, setOpenSemForm] = useState(true);
 

  const handleAddMaterial = (materialData) => {
    if (!materialData || !selectedSemester) return;
    
    addStudyMaterial({
      ...materialData,
      semester: selectedSemester,
      uploadedBy: user?.name || 'Anonymous'
    });
    setShowForm(false);
  };

  const handleSemesterSelect = (sem) => {
    if (sem) {
      setSelectedSemester(sem);
      setOpenSemForm(false);
    }
  };

  const handleSemesterCancel = () => {
    setOpenSemForm(false);
  };

  const subjects = ['all', 'computer science', 'mathematics', 'physics', 'chemistry', 'biology', 'english', 'history'];

  // Safe filtering with proper null checks
  const filteredMaterials = React.useMemo(() => {
    // Double check - this should not happen due to early return above
    if (!studyMaterials || !Array.isArray(studyMaterials) || studyMaterials.length === 0) {
      return [];
    }

    // Don't filter if no semester is selected yet
    if (!selectedSemester || selectedSemester === '') {
      return [];
    }

    return studyMaterials.filter(material => {
      // Skip invalid materials
      if (!material || typeof material !== 'object') {
        return false;
      }

      // Safe string extraction with fallbacks
      const title = String(material.title || '');
      const subject = String(material.subject || '');
      const tags = Array.isArray(material.tags) ? material.tags : [];
      const semester = String(material.semester || '');
      const search = String(searchTerm || '');

      // Search matching (case insensitive)
      const searchLower = search.toLowerCase();
      const matchesSearch = search === '' || 
        title.toLowerCase().includes(searchLower) ||
        subject.toLowerCase().includes(searchLower) ||
        tags.some(tag => String(tag || '').toLowerCase().includes(searchLower));

      // Filter matching
      const matchesFilter = filter === 'all' || 
        subject.toLowerCase() === String(filter || '').toLowerCase();

      // Semester matching (exact string comparison)
      const currentSemester = String(selectedSemester || '');
      const matchesSemester = currentSemester === '' || semester === currentSemester;

      return matchesSearch && matchesFilter && matchesSemester;
    });
  }, [studyMaterials, searchTerm, filter, selectedSemester]);

  return (
    <div className="study-materials">
      <div className="materials-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="materials-title">Study Materials</h1>
            <p className="materials-subtitle">Access and share educational resources</p>
          </div>
          
          {/* Semester Display in Navbar */}
          <div className="semester-navbar">
            {selectedSemester ? (
              <div className="semester-display">
                <span className="semester-label">Current Semester:</span>
                <div className="semester-badge">
                  <span className="semester-text">Semester {selectedSemester}</span>
                  <button
                    className="change-semester-btn"
                    onClick={() => setOpenSemForm(true)}
                    title="Change Semester"
                  >
                    ⚙️
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="btn btn-primary select-semester-btn"
                onClick={() => setOpenSemForm(true)}
              >
                📚 Select Semester
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="materials-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-tabs">
          {subjects.map(subject => (
            <button
              key={subject}
              className={`filter-tab ${filter === subject ? 'active' : ''}`}
              onClick={() => setFilter(subject)}
            >
              {subject === 'all' ? 'All Subjects' : subject.replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>

        <div className="add-material-btn-container">
          <button
            className="btn btn-primary add-material-btn"
            onClick={() => setShowForm(true)}
            disabled={!selectedSemester}
          >
            + Upload Material
          </button>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <MaterialForm
              onSubmit={handleAddMaterial}
              onCancel={() => setShowForm(false)}
              selectedSemester={selectedSemester}
            />
          </div>
        </div>
      )}

      {openSemForm && (
        <div className="modal-overlay">
          <SemForm
            selectedSemester={selectedSemester}
            setSelectedSemester={handleSemesterSelect}
            onCancel={handleSemesterCancel}
          />
        </div>
      )}

      {selectedSemester && (
        <>
          <div className="materials-stats">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <div className="stat-value">{filteredMaterials?.length || 0}</div>
                <div className="stat-label">Materials (Sem {selectedSemester})</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📥</div>
              <div className="stat-content">
                <div className="stat-value">{filteredMaterials?.reduce((sum, m) => sum + (m?.downloads || 0), 0) || 0}</div>
                <div className="stat-label">Total Downloads</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🎓</div>
              <div className="stat-content">
                <div className="stat-value">{new Set(filteredMaterials?.map(m => m?.subject).filter(Boolean)).size || 0}</div>
                <div className="stat-label">Subjects</div>
              </div>
            </div>
          </div>

          <div className="materials-grid">
            {filteredMaterials?.length > 0 ? (
              filteredMaterials.map(material => (
                <MaterialCard key={material?.id || Math.random()} material={material} />
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>No materials found for Semester {selectedSemester}</h3>
                <p>Try adjusting your search or upload new study materials for this semester</p>
              </div>
            )}
          </div>
        </>
      )}

      
    </div>
  );
};

export default StudyMaterials;