import React from 'react';
import './MaterialCard.css';

const MaterialCard = ({ material }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFileIcon = (fileType) => {
    const icons = {
      'pdf': '📄',
      'doc': '📝',
      'docx': '📝',
      'ppt': '📊',
      'pptx': '📊',
      'txt': '📃',
      'zip': '📦',
      'rar': '📦'
    };
    return icons[fileType.toLowerCase()] || '📁';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="material-card">
      <div className="material-header">
        <div className="file-icon">
          {getFileIcon(material.fileType)}
        </div>
        <div className="material-info">
          <h3 className="material-title">{material.title}</h3>
          <div className="material-meta">
            <span className="material-subject">{material.subject}</span>
            <span className="material-separator">•</span>
            <span className="material-semester">{material.semester} Semester</span>
          </div>
        </div>
      </div>
      
      <div className="material-content">
        <p className="material-description">{material.description}</p>
        
        <div className="material-tags">
          {material.tags.map((tag, index) => (
            <span key={index} className="material-tag">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="material-details">
          <div className="material-detail">
            <span className="detail-icon">👤</span>
            <span className="detail-text">{material.uploadedBy}</span>
          </div>
          
          <div className="material-detail">
            <span className="detail-icon">📅</span>
            <span className="detail-text">{formatDate(material.createdAt)}</span>
          </div>
          
          <div className="material-detail">
            <span className="detail-icon">💾</span>
            <span className="detail-text">{material.fileSize}</span>
          </div>
          
          <div className="material-detail">
            <span className="detail-icon">📥</span>
            <span className="detail-text">{material.downloads} downloads</span>
          </div>
        </div>
      </div>
      
      <div className="material-actions">
        <button className="btn btn-primary download-btn">
          <span>📥</span>
          Download
        </button>
        <button className="btn btn-outline preview-btn" onClick={() => window.open(material.fileUrl || '#', '_blank')}
  disabled={!material.fileUrl}>
          <span>👁️</span>
          Preview
        </button>
      </div>
    </div>
  );
};

export default MaterialCard;