import React from 'react';
import './GroupCard.css';

const GroupCard = ({ group, isJoined, onJoin }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'beginner': 'success',
      'intermediate': 'warning',
      'advanced': 'danger',
      'all levels': 'primary'
    };
    return colors[difficulty.toLowerCase()] || 'primary';
  };

  const spotsLeft = group.maxMembers - group.members.length;
  const isFull = spotsLeft === 0;

  return (
    <div className="group-card">
      <div className="group-header">
        <div className="group-info">
          <h3 className="group-title">{group.title}</h3>
          <div className="group-meta">
            <span className="group-subject">{group.subject}</span>
            <span className="group-separator">•</span>
            <span className={`group-difficulty ${getDifficultyColor(group.difficulty)}`}>
              {group.difficulty}
            </span>
          </div>
        </div>
        <div className="group-members-badge">
          <span className="members-icon">👥</span>
          <span className="members-count">{group.members.length}/{group.maxMembers}</span>
        </div>
      </div>
      
      <div className="group-content">
        <p className="group-description">{group.description}</p>
        
        <div className="group-goals">
          <h4 className="goals-title">Goals:</h4>
          <ul className="goals-list">
            {group.goals.map((goal, index) => (
              <li key={index} className="goal-item">
                <span className="goal-bullet">•</span>
                <span className="goal-text">{goal}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="group-details">
          <div className="group-detail">
            <span className="detail-icon">👤</span>
            <span className="detail-text">Created by {group.createdBy}</span>
          </div>
          
          <div className="group-detail">
            <span className="detail-icon">⏰</span>
            <span className="detail-text">{group.meetingTime}</span>
          </div>
          
          <div className="group-detail">
            <span className="detail-icon">📍</span>
            <span className="detail-text">{group.location}</span>
          </div>
          
          <div className="group-detail">
            <span className="detail-icon">📅</span>
            <span className="detail-text">Created {formatDate(group.createdAt)}</span>
          </div>
        </div>
      </div>
      
      <div className="group-actions">
        <div className="group-status">
          {isFull ? (
            <span className="status-badge full">Group Full</span>
          ) : (
            <span className="status-badge available">{spotsLeft} spots left</span>
          )}
        </div>
        
        <button
          className={`btn ${isJoined ? 'btn-outline' : 'btn-primary'} join-btn`}
          onClick={onJoin}
          disabled={isJoined || isFull}
        >
          {isJoined ? 'Joined ✓' : 
           isFull ? 'Group Full' : 
           'Join Group'}
        </button>
      </div>
    </div>
  );
};

export default GroupCard;