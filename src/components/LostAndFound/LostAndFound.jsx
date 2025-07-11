import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import LostItemCard from './LostItemCard';
import LostItemForm from './LostItemForm';
import './LostAndFound.css';

const LostAndFound = () => {
  const { lostItems, addLostItem } = useApp();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = lostItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddItem = (itemData) => {
    addLostItem({
      ...itemData,
      reportedBy: user?.name || 'Anonymous',
      contact: user?.email || 'No contact provided'
    });
    setShowForm(false);
  };

  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'lost', label: 'Lost Items' },
    { value: 'found', label: 'Found Items' }
  ];

  return (
    <div className="lost-and-found">
      <div className="lost-found-header">
        <h1 className="lost-found-title">Lost & Found</h1>
        <p className="lost-found-subtitle">Help reunite lost items with their owners</p>
      </div>

      <div className="lost-found-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search lost items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-tabs">
          {categories.map(category => (
            <button
              key={category.value}
              className={`filter-tab ${filter === category.value ? 'active' : ''}`}
              onClick={() => setFilter(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <button
          className="btn btn-primary add-item-btn"
          onClick={() => setShowForm(true)}
        >
          + Report Item
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <LostItemForm
              onSubmit={handleAddItem}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="lost-found-stats">
        <div className="stat-card lost">
          <div className="stat-icon">🔍</div>
          <div className="stat-content">
            <div className="stat-value">{lostItems.filter(item => item.status === 'lost').length}</div>
            <div className="stat-label">Lost Items</div>
          </div>
        </div>
        
        <div className="stat-card found">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{lostItems.filter(item => item.status === 'found').length}</div>
            <div className="stat-label">Found Items</div>
          </div>
        </div>
        
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{lostItems.length}</div>
            <div className="stat-label">Total Reports</div>
          </div>
        </div>
      </div>

      <div className="lost-found-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <LostItemCard key={item.id} item={item} />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No items found</h3>
            <p>Try adjusting your search or report a lost/found item</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostAndFound;