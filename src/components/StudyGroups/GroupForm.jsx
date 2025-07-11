import React, { useState } from 'react';
import './GroupForm.css';

const GroupForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Computer Science',
    maxMembers: 8,
    meetingTime: '',
    location: '',
    difficulty: 'intermediate',
    goals: []
  });

  const [goalInput, setGoalInput] = useState('');
  const [errors, setErrors] = useState({});

  const subjects = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History',
    'Career Development',
    'Interview Prep',
    'Soft Skills'
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'all levels', label: 'All Levels' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddGoal = () => {
    if (goalInput.trim() && !formData.goals.includes(goalInput.trim())) {
      setFormData(prev => ({
        ...prev,
        goals: [...prev.goals, goalInput.trim()]
      }));
      setGoalInput('');
    }
  };

  const handleRemoveGoal = (goalToRemove) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal !== goalToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddGoal();
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
    
    if (!formData.meetingTime.trim()) {
      newErrors.meetingTime = 'Meeting time is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (formData.maxMembers < 2) {
      newErrors.maxMembers = 'Group must have at least 2 members';
    }
    
    if (formData.goals.length === 0) {
      newErrors.goals = 'At least one goal is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        maxMembers: parseInt(formData.maxMembers)
      });
    }
  };

  return (
    <div className="group-form">
      <h2 className="form-title">Create Study Group</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Group Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Enter group title"
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
            placeholder="Describe your study group"
            rows="4"
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="form-input"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Difficulty Level</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="form-input"
            >
              {difficulties.map(diff => (
                <option key={diff.value} value={diff.value}>
                  {diff.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Meeting Time *</label>
            <input
              type="text"
              name="meetingTime"
              value={formData.meetingTime}
              onChange={handleInputChange}
              className={`form-input ${errors.meetingTime ? 'error' : ''}`}
              placeholder="e.g., Saturdays 2:00 PM"
            />
            {errors.meetingTime && <span className="error-text">{errors.meetingTime}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Max Members</label>
            <input
              type="number"
              name="maxMembers"
              value={formData.maxMembers}
              onChange={handleInputChange}
              className={`form-input ${errors.maxMembers ? 'error' : ''}`}
              min="2"
              max="50"
            />
            {errors.maxMembers && <span className="error-text">{errors.maxMembers}</span>}
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
            placeholder="e.g., Library Room 201"
          />
          {errors.location && <span className="error-text">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Goals *</label>
          <div className="goal-input-container">
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-input"
              placeholder="Add a goal and press Enter"
            />
            <button
              type="button"
              onClick={handleAddGoal}
              className="btn btn-outline add-goal-btn"
            >
              Add
            </button>
          </div>
          {errors.goals && <span className="error-text">{errors.goals}</span>}
          <div className="goals-list">
            {formData.goals.map((goal, index) => (
              <div key={index} className="goal-item">
                <span className="goal-text">{goal}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveGoal(goal)}
                  className="remove-goal-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroupForm;