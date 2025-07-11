import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import GroupCard from './GroupCard';
import GroupForm from './GroupForm';
import './StudyGroups.css';

const StudyGroups = () => {
  const { studyGroups, addStudyGroup, joinStudyGroup } = useApp();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         group.subject.toLowerCase() === filter.toLowerCase() ||
                         (filter === 'joined' && group.members.includes(user?.id)) ||
                         (filter === 'available' && group.members.length < group.maxMembers);
    return matchesSearch && matchesFilter;
  });

  const handleAddGroup = (groupData) => {
    addStudyGroup({
      ...groupData,
      createdBy: user?.name || 'Anonymous'
    });
    setShowForm(false);
  };

  const handleJoinGroup = (groupId) => {
    joinStudyGroup(groupId, user?.id);
  };

  const subjects = ['all', 'computer science', 'mathematics', 'physics', 'chemistry', 'career development', 'available', 'joined'];

  return (
    <div className="study-groups">
      <div className="groups-header">
        <h1 className="groups-title">Study Groups</h1>
        <p className="groups-subtitle">Find or create study groups to learn together</p>
      </div>

      <div className="groups-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search study groups..."
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
              {subject === 'all' ? 'All Groups' : 
               subject === 'available' ? 'Available' :
               subject === 'joined' ? 'My Groups' :
               subject.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
        
        <button
          className="btn btn-primary add-group-btn"
          onClick={() => setShowForm(true)}
        >
          + Create Group
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <GroupForm
              onSubmit={handleAddGroup}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="groups-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{studyGroups.length}</div>
            <div className="stat-label">Total Groups</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{studyGroups.filter(g => g.members.includes(user?.id)).length}</div>
            <div className="stat-label">Your Groups</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔓</div>
          <div className="stat-content">
            <div className="stat-value">{studyGroups.filter(g => g.members.length < g.maxMembers).length}</div>
            <div className="stat-label">Available</div>
          </div>
        </div>
      </div>

      <div className="groups-grid">
        {filteredGroups.length > 0 ? (
          filteredGroups.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              isJoined={group.members.includes(user?.id)}
              onJoin={() => handleJoinGroup(group.id)}
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No study groups found</h3>
            <p>Try adjusting your search or create a new study group</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyGroups;