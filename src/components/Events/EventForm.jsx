import React, { useState } from 'react';
import './EventForm.css';

const EventForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'technology',
    maxParticipants: 100,
    image: '',
    registrationLink: '',
    points: 30
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'sports', label: 'Sports' },
    { value: 'career', label: 'Career' },
    { value: 'academic', label: 'Academic' }
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

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const eventDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (eventDate < today) {
        newErrors.date = 'Event date cannot be in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (formData.maxParticipants < 1) {
      newErrors.maxParticipants = 'Maximum participants must be at least 1';
    }

    if (formData.points < 0) {
      newErrors.points = 'Points cannot be negative';
    }
    if(!formData.registrationLink.trim())
    {
      newErrors.registrationLink = 'URL is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        maxParticipants: parseInt(formData.maxParticipants),
        points: parseInt(formData.points),
        image: formData.image || 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'
      });
    }
  };

  return (
    <div className="event-form">
      <h2 className="form-title">Create New Event</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Event Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Enter event title"
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
            placeholder="Describe your event"
            rows="4"
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`form-input ${errors.date ? 'error' : ''}`}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Time *</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className={`form-input ${errors.time ? 'error' : ''}`}
            />
            {errors.time && <span className="error-text">{errors.time}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`form-input ${errors.location ? 'error' : ''}`}
            placeholder="Event location"
          />
          {errors.location && <span className="error-text">{errors.location}</span>}
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

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Max Participants</label>
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleInputChange}
              className={`form-input ${errors.maxParticipants ? 'error' : ''}`}
              min="1"
            />
            {errors.maxParticipants && <span className="error-text">{errors.maxParticipants}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Points Reward</label>
            <input
              type="number"
              name="points"
              value={formData.points}
              onChange={handleInputChange}
              className={`form-input ${errors.points ? 'error' : ''}`}
              min="0"
            />
            {errors.points && <span className="error-text">{errors.points}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Event Image URL (Optional)</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="form-input"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Event Website Link</label>
          <input
            type="url"
            name="registrationLink"
            value={formData.registrationLink}
            onChange={handleInputChange}
            className="form-input"
            placeholder="https://example.com/register"
          />
           {errors.registrationLink && <span className="error-text">{errors.registrationLink}</span>}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
