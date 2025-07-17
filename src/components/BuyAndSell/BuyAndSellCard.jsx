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
    <div className="sellItem-card">
      <div className="sellItem-imageWrapper">
        <img src={item.image} alt={item.title} className="sellItem-image" />
        <div className="sellItem-price">₹{item.price}</div>
      </div>
      <div className="sellItem-content">
        <h3 className="sellItem-title">{item.title}</h3>
        <span className="sellItem-category">
          {getCategoryIcon(item.category)} {item.category}
        </span>
        <p className="sellItem-description">{item.description}</p>
        <div className="sellItem-details">
          <span>📍 {item.location}</span>
          <span>📅 {formatDate(item.datePosted)}</span>
          <span>👤 {item.sellerName}</span>
        </div>
        <div className="sellItem-actions">
          <a href={`tel:${item.contact}`} className="btn btn-primary">
            Call Seller
          </a>
        </div>
      </div>
    </div>
  );
};

export default SellItemCard;