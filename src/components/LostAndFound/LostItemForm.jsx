import React, { useState } from 'react';
import './LostItemForm.css';

const LostItemForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'electronics',
    location: '',
    dateFound: '',
    status: 'lost',
    image: ''
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'bags', label: 'Bags' },
    { value: 'documents', label: 'Documents' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.dateFound) {
      newErrors.dateFound = 'Date is required';
    } else {
      const itemDate = new Date(formData.dateFound);
      const today = new Date();
      if (itemDate > today) {
        newErrors.dateFound = 'Date cannot be in the future';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        image: formData.image || 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'
      });
    }
  };

  return (
    <div className="lost-item-form">
      <h2 className="form-title">Report Lost/Found Item</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Item Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="e.g., Blue iPhone 13"
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            placeholder="Detailed description of the item"
            rows="4"
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-input"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`form-input ${errors.location ? 'error' : ''}`}
              placeholder="Where was it lost/found?"
            />
            {errors.location && <span className="error-text">{errors.location}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              name="dateFound"
              value={formData.dateFound}
              onChange={handleInputChange}
              className={`form-input ${errors.dateFound ? 'error' : ''}`}
            />
            {errors.dateFound && <span className="error-text">{errors.dateFound}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Item Image URL (Optional)</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="form-input"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Report Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default LostItemForm;