import React from 'react';
import './LostItemCard.css';

const LostItemCard = ({ item }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    return status === 'lost' ? 'warning' : 'success';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'electronics': '📱',
      'clothing': '👕',
      'books': '📚',
      'accessories': '🎒',
      'bags': '🎒',
      'documents': '📄',
      'jewelry': '💍',
      'other': '❓'
    };
    return icons[category.toLowerCase()] || '❓';
  };

  return (
    <div className="lost-item-card">
      <div className="item-image">
        <img src={item.image} alt={item.title} />
        <div className={`item-status ${getStatusColor(item.status)}`}>
          {item.status === 'lost' ? '🔍 Lost' : '✅ Found'}
        </div>
      </div>
      
      <div className="item-content">
        <div className="item-header">
          <h3 className="item-title">{item.title}</h3>
          <span className="item-category">
            {getCategoryIcon(item.category)} {item.category}
          </span>
        </div>
        
        <p className="item-description">{item.description}</p>
        
        <div className="item-details">
          <div className="item-detail">
            <span className="detail-icon">📍</span>
            <span className="detail-text">{item.location}</span>
          </div>
          
          <div className="item-detail">
            <span className="detail-icon">📅</span>
            <span className="detail-text">{formatDate(item.dateFound)}</span>
          </div>
          
          <div className="item-detail">
            <span className="detail-icon">👤</span>
            <span className="detail-text">{item.reportedBy}</span>
          </div>
        </div>
      </div>
      
      <div className="item-actions">
        <button className="btn btn-primary contact-btn">
          Contact Reporter
        </button>
        <button className="btn btn-outline share-btn">
          Share
        </button>
      </div>
    </div>
  );
};

export default LostItemCard;