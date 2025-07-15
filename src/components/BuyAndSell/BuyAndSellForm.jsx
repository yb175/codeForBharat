import React, { useState } from 'react';
import './form.css'
const SellItemForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'electronics',
    location: '',
    datePosted: '',
    price: '',
    image: '',
    sellerName: '',
    contact: ''
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'books', label: 'Books' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'others', label: 'Others' }
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
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.datePosted) newErrors.datePosted = 'Date is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.sellerName.trim()) newErrors.sellerName = 'Name is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        image: formData.image || 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
      });
    }
  };

  return (
    <div className="sell-item-form">
      <h2 className="form-title">Sell an Item</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? 'error' : ''}
            placeholder="e.g., iPhone 13"
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={errors.description ? 'error' : ''}
            placeholder="Write details about the item..."
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleInputChange}>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={errors.location ? 'error' : ''}
            placeholder="Enter location"
          />
          {errors.location && <span className="error-text">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label>Date *</label>
          <input
            type="date"
            name="datePosted"
            value={formData.datePosted}
            onChange={handleInputChange}
            className={errors.datePosted ? 'error' : ''}
          />
          {errors.datePosted && <span className="error-text">{errors.datePosted}</span>}
        </div>

        <div className="form-group">
          <label>Price (in ₹) *</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className={errors.price ? 'error' : ''}
            placeholder="e.g., 4500"
          />
          {errors.price && <span className="error-text">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label>Your Name *</label>
          <input
            type="text"
            name="sellerName"
            value={formData.sellerName}
            onChange={handleInputChange}
            className={errors.sellerName ? 'error' : ''}
            placeholder="e.g., Raj Verma"
          />
          {errors.sellerName && <span className="error-text">{errors.sellerName}</span>}
        </div>

        <div className="form-group">
          <label>Contact No. *</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            className={errors.contact ? 'error' : ''}
            placeholder="e.g., 9876543210"
          />
          {errors.contact && <span className="error-text">{errors.contact}</span>}
        </div>

        <div className="form-group">
          <label>Image URL (Optional)</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/item.jpg"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            List Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellItemForm;
