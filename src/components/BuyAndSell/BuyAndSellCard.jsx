import React from 'react';
import './card.css';

const SellItemCard = ({ item, activeCardId, setActiveCardId }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      electronics: '📱',
      books: '📚',
      furniture: '🪑',
      clothing: '👕',
      others: '📦',
    };
    return icons[category.toLowerCase()] || '📦';
  };

  return (
    <div className="sell-item-card">
      <div className="item-image">
        <img src={item.image} alt={item.title} />
        <div className="item-price">₹{item.price}</div>
      </div>
      <div className="item-content">
        <h3 className="item-title">{item.title}</h3>
        <span className="item-category">
          {getCategoryIcon(item.category)} {item.category}
        </span>
        <p className="item-description">{item.description}</p>
        <div className="item-details">
          <span>📍 {item.location}</span>
          <span>📅 {formatDate(item.datePosted)}</span>
          <span>👤 {item.sellerName}</span>
        </div>
        <div className="item-actions">
          <a href={`tel:${item.contact}`} className="btn btn-primary">
            Call Seller
          </a>
        </div>
      </div>
    </div>
  );
};

export default SellItemCard;