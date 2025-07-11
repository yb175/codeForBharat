import React from 'react';
import './EventCard.css';

const EventCard = ({ event, isRegistered, onRegister }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'technology': 'primary',
      'cultural': 'secondary',
      'sports': 'accent',
      'career': 'purple',
      'academic': 'pink'
    };
    return colors[category.toLowerCase()] || 'primary';
  };

  const spotsLeft = event.maxParticipants - event.registeredUsers.length;

  return (
    <div className="event-card">
      <div className="event-image">
        <img src={event.image} alt={event.title} />
        <div className={`event-category ${getCategoryColor(event.category)}`}>
          {event.category}
        </div>
      </div>
      
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>
        
        <div className="event-details">
          <div className="event-detail">
            <span className="detail-icon">📅</span>
            <span className="detail-text">{formatDate(event.date)}</span>
          </div>
          
          <div className="event-detail">
            <span className="detail-icon">🕐</span>
            <span className="detail-text">{event.time}</span>
          </div>
          
          <div className="event-detail">
            <span className="detail-icon">📍</span>
            <span className="detail-text">{event.location}</span>
          </div>
          
          <div className="event-detail">
            <span className="detail-icon">👥</span>
            <span className="detail-text">{event.organizer}</span>
          </div>
        </div>
        
        <div className="event-stats">
          <div className="stat">
            <span className="stat-value">{event.registeredUsers.length}</span>
            <span className="stat-label">Registered</span>
          </div>
          
          <div className="stat">
            <span className="stat-value">{spotsLeft}</span>
            <span className="stat-label">Spots Left</span>
          </div>
          
          <div className="stat">
            <span className="stat-value">{event.points}</span>
            <span className="stat-label">Points</span>
          </div>
        </div>
      </div>
      
      <div className="event-actions">
        <button
          className={`btn ${isRegistered ? 'btn-outline' : 'btn-primary'} register-btn`}
          onClick={onRegister}
          disabled={isRegistered || spotsLeft === 0}
        >
          {isRegistered ? 'Registered ✓' : 
           spotsLeft === 0 ? 'Event Full' : 
           'Register Now'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;