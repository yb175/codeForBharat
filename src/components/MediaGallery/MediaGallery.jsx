import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import MediaCard from './MediaCard';
import MediaForm from './MediaForm';
import './MediaGallery.css';

const MediaGallery = () => {
  const { mediaItems, addMediaItem } = useApp();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'all' || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddMedia = (mediaData) => {
    addMediaItem({
      ...mediaData,
      uploadedBy: user?.name || 'Anonymous'
    });
    setShowForm(false);
  };

  const categories = [
    { value: 'all', label: 'All Media' },
    { value: 'meme', label: 'Memes' },
    { value: 'gallery', label: 'Gallery' }
  ];

  return (
    <div className="media-gallery">
      <div className="media-header">
        <h1 className="media-title">📸 Media Gallery</h1>
        <p className="media-subtitle">Share memes and memories with your campus community</p>
      </div>

      <div className="media-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search media..."
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
          className="btn btn-primary add-media-btn"
          onClick={() => setShowForm(true)}
        >
          + Share Media
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <MediaForm
              onSubmit={handleAddMedia}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="media-stats">
        <div className="stat-card">
          <div className="stat-icon">📸</div>
          <div className="stat-content">
            <div className="stat-value">{mediaItems.length}</div>
            <div className="stat-label">Total Posts</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">😂</div>
          <div className="stat-content">
            <div className="stat-value">{mediaItems.filter(item => item.type === 'meme').length}</div>
            <div className="stat-label">Memes</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🖼️</div>
          <div className="stat-content">
            <div className="stat-value">{mediaItems.filter(item => item.type === 'gallery').length}</div>
            <div className="stat-label">Gallery Posts</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">❤️</div>
          <div className="stat-content">
            <div className="stat-value">{mediaItems.reduce((sum, item) => sum + item.likes, 0)}</div>
            <div className="stat-label">Total Likes</div>
          </div>
        </div>
      </div>

      <div className="media-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <MediaCard key={item.id} item={item} />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📸</div>
            <h3>No media found</h3>
            <p>Try adjusting your search or share some media</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;