import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import MaterialCard from './MaterialCard';
import MaterialForm from './MaterialForm';
import { Link,Outlet } from 'react-router';
import './StudyMaterials.css';
import SemForm from './semForm';

const StudyMaterials = () => {
  const { studyMaterials, addStudyMaterial } = useApp();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  // No sem selected 
  const [selectedSemester, setSelectedSemester] = useState('');
  const [openSemForm, setOpenSemForm] = useState(true);
  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'all' || material.subject.toLowerCase() === filter.toLowerCase();
    const matchesSemester = selectedSemester==='' || material.semester.toLowerCase() === selectedSemester.toLowerCase(); 
    return (matchesSearch && matchesFilter) && matchesSemester;
  });

  const handleAddMaterial = (materialData) => {
    addStudyMaterial({
      ...materialData,
      uploadedBy: user?.name || 'Anonymous'
    });
    setShowForm(false);
  };

  const subjects = ['all', 'computer science', 'mathematics', 'physics', 'chemistry', 'biology', 'english', 'history'];

  return (
    <div className="study-materials">
      <div className="materials-header">
        <h1 className="materials-title">Study Materials</h1>
        <p className="materials-subtitle">Access and share educational resources</p>
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
              {subject === 'all' ? 'All Subjects' : 
               subject.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
        <div className="add-material-btn-container" style={{ display: 'flex', gap: '10px' }}>
        <button
          className="btn btn-primary add-material-btn"
          onClick={() => setOpenSemForm(true)}
        >
          Select Semester
        </button>
        <button
          className="btn btn-primary add-material-btn"
          onClick={() => setShowForm(true)}
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
            />
          </div>
        </div>
      )}
      {openSemForm && (
        <div className="modal-overlay">
            <SemForm
              onCancel={() => setOpenSemForm(false)}
              selectedSemester={selectedSemester}
              setSelectedSemester={setSelectedSemester}
            />
        </div>
      )}
      <div className="materials-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-value">{studyMaterials.length}</div>
            <div className="stat-label">Total Materials</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📥</div>
          <div className="stat-content">
            <div className="stat-value">{studyMaterials.reduce((sum, m) => sum + m.downloads, 0)}</div>
            <div className="stat-label">Total Downloads</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <div className="stat-value">{new Set(studyMaterials.map(m => m.subject)).size}</div>
            <div className="stat-label">Subjects</div>
          </div>
        </div>
      </div>

      <div className="materials-grid">
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map(material => (
            <MaterialCard key={material.id} material={material} />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No materials found</h3>
            <p>Try adjusting your search or upload new study materials</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;