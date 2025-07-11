import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import ReportForm from './ReportForm';
import './ReportingSystem.css';

const ReportingSystem = () => {
  const { reports, addReport } = useApp();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const handleAddReport = (reportData) => {
    addReport(reportData);
    setShowForm(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'warning',
      'under-review': 'primary',
      'resolved': 'success',
      'dismissed': 'danger'
    };
    return colors[status] || 'primary';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'low': 'success',
      'medium': 'warning',
      'high': 'danger'
    };
    return colors[severity.toLowerCase()] || 'warning';
  };

  return (
    <div className="reporting-system">
      <div className="reporting-header">
        <h1 className="reporting-title">🚨 Anonymous Reporting</h1>
        <p className="reporting-subtitle">Report incidents safely and anonymously to create a better campus environment</p>
      </div>

      <div className="reporting-info">
        <div className="info-card">
          <div className="info-icon">🔒</div>
          <div className="info-content">
            <h3>Anonymous & Secure</h3>
            <p>Your identity is completely protected. All reports are handled confidentially.</p>
          </div>
        </div>
        
        <div className="info-card">
          <div className="info-icon">⚡</div>
          <div className="info-content">
            <h3>Quick Response</h3>
            <p>Reports are reviewed promptly by our dedicated team to ensure swift action.</p>
          </div>
        </div>
        
        <div className="info-card">
          <div className="info-icon">🛡️</div>
          <div className="info-content">
            <h3>Safe Environment</h3>
            <p>Help us maintain a safe and inclusive campus for everyone.</p>
          </div>
        </div>
      </div>

      <div className="reporting-actions">
        <button
          className="btn btn-danger report-btn"
          onClick={() => setShowForm(true)}
        >
          🚨 Report an Incident
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ReportForm
              onSubmit={handleAddReport}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="reporting-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{reports.length}</div>
            <div className="stat-label">Total Reports</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-value">{reports.filter(r => r.status === 'pending').length}</div>
            <div className="stat-label">Pending Review</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{reports.filter(r => r.status === 'resolved').length}</div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>
      </div>

      <div className="reports-section">
        <h2 className="section-title">Recent Reports (Anonymous)</h2>
        <p className="section-subtitle">General statistics to show our commitment to addressing issues</p>
        
        <div className="reports-grid">
          {reports.length > 0 ? (
            reports.map(report => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <div className="report-category">
                    <span className="category-icon">🚨</span>
                    <span className="category-text">{report.category}</span>
                  </div>
                  <div className={`report-status ${getStatusColor(report.status)}`}>
                    {report.status.replace('-', ' ')}
                  </div>
                </div>
                
                <div className="report-content">
                  <h3 className="report-title">{report.title}</h3>
                  <p className="report-description">{report.description}</p>
                  
                  <div className="report-details">
                    <div className="report-detail">
                      <span className="detail-icon">📍</span>
                      <span className="detail-text">{report.location}</span>
                    </div>
                    
                    <div className="report-detail">
                      <span className="detail-icon">📅</span>
                      <span className="detail-text">{new Date(report.incidentDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="report-detail">
                      <span className="detail-icon">⚠️</span>
                      <span className={`severity-badge ${getSeverityColor(report.severity)}`}>
                        {report.severity} severity
                      </span>
                    </div>
                    
                    <div className="report-detail">
                      <span className="detail-icon">👥</span>
                      <span className="detail-text">
                        {report.witnesses ? 'Witnesses available' : 'No witnesses'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="report-footer">
                  <div className="report-date">
                    Reported on {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🚨</div>
              <h3>No reports yet</h3>
              <p>We're glad there are no incidents to report. Help us keep it that way!</p>
            </div>
          )}
        </div>
      </div>

      <div className="help-section">
        <h2>Need Immediate Help?</h2>
        <div className="help-contacts">
          <div className="help-card">
            <div className="help-icon">🚨</div>
            <div className="help-content">
              <h3>Emergency</h3>
              <p>For immediate danger or emergencies</p>
              <a href="tel:911" className="help-link">Call 911</a>
            </div>
          </div>
          
          <div className="help-card">
            <div className="help-icon">🏥</div>
            <div className="help-content">
              <h3>Campus Security</h3>
              <p>For campus-related security issues</p>
              <a href="tel:555-0123" className="help-link">Call (555) 012-3456</a>
            </div>
          </div>
          
          <div className="help-card">
            <div className="help-icon">💬</div>
            <div className="help-content">
              <h3>Counseling Services</h3>
              <p>For emotional support and counseling</p>
              <a href="tel:555-0124" className="help-link">Call (555) 012-3457</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingSystem;