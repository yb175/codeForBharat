import React, { useState } from 'react';
import './ReportForm.css';

const ReportForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'ragging',
    location: '',
    incidentDate: '',
    severity: 'medium',
    witnesses: false,
    additionalInfo: ''
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'ragging', label: 'Ragging' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'discrimination', label: 'Discrimination' },
    { value: 'bullying', label: 'Bullying' },
    { value: 'violence', label: 'Violence' },
    { value: 'theft', label: 'Theft' },
    { value: 'other', label: 'Other' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
    
    if (!formData.incidentDate) {
      newErrors.incidentDate = 'Incident date is required';
    } else {
      const incidentDate = new Date(formData.incidentDate);
      const today = new Date();
      if (incidentDate > today) {
        newErrors.incidentDate = 'Incident date cannot be in the future';
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
    <div className="report-form">
      <div className="form-header">
        <h2 className="form-title">🚨 Report an Incident</h2>
        <p className="form-subtitle">Your report is completely anonymous and will be handled confidentially</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Incident Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Brief title describing the incident"
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
            placeholder="Provide detailed information about the incident"
            rows="5"
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-row">
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

          <div className="form-group">
            <label className="form-label">Severity Level</label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
              className="form-input"
            >
              {severityLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
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
              placeholder="Where did this incident occur?"
            />
            {errors.location && <span className="error-text">{errors.location}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Incident Date *</label>
            <input
              type="date"
              name="incidentDate"
              value={formData.incidentDate}
              onChange={handleInputChange}
              className={`form-input ${errors.incidentDate ? 'error' : ''}`}
            />
            {errors.incidentDate && <span className="error-text">{errors.incidentDate}</span>}
          </div>
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="witnesses"
              name="witnesses"
              checked={formData.witnesses}
              onChange={handleInputChange}
              className="form-checkbox"
            />
            <label htmlFor="witnesses" className="checkbox-label">
              Were there witnesses to this incident?
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Additional Information (Optional)</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="form-textarea"
            placeholder="Any additional details that might be helpful"
            rows="3"
          />
        </div>

        <div className="privacy-notice">
          <div className="notice-icon">🔒</div>
          <div className="notice-content">
            <h4>Privacy & Confidentiality</h4>
            <p>
              Your report is completely anonymous. We do not collect any personal information 
              that could identify you. All reports are handled with strict confidentiality 
              and reviewed by trained professionals.
            </p>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-danger">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;