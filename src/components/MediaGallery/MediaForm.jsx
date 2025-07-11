import React, { useState } from 'react';
import './MediaForm.css';

const MediaForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    type: 'meme',
    imageUrl: '',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  const mediaTypes = [
    { value: 'meme', label: 'Meme' },
    { value: 'gallery', label: 'Gallery' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.caption.trim()) {
      newErrors.caption = 'Caption is required';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else {
      try {
        new URL(formData.imageUrl);
      } catch {
        newErrors.imageUrl = 'Please enter a valid URL';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="media-form">
      <h2 className="form-title">Share Media</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Enter a catchy title"
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Caption *</label>
          <textarea
            name="caption"
            value={formData.caption}
            onChange={handleInputChange}
            className={`form-textarea ${errors.caption ? 'error' : ''}`}
            placeholder="Write a caption for your media"
            rows="3"
          />
          {errors.caption && <span className="error-text">{errors.caption}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="form-input"
          >
            {mediaTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Image URL *</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className={`form-input ${errors.imageUrl ? 'error' : ''}`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.imageUrl && <span className="error-text">{errors.imageUrl}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Tags</label>
          <div className="tag-input-container">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-input"
              placeholder="Add tags and press Enter"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="btn btn-outline add-tag-btn"
            >
              Add
            </button>
          </div>
          <div className="tags-list">
            {formData.tags.map((tag, index) => (
              <span key={index} className="tag-item">
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="remove-tag-btn"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Share Media
          </button>
        </div>
      </form>
    </div>
  );
};

export default MediaForm;