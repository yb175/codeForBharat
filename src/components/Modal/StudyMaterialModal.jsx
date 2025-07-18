import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { X, BookOpen, User, Download, Calendar } from 'lucide-react';
import './StudyMaterialModal.css';

const StudyMaterialModal = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const { studyMaterials } = useApp();

  const material = studyMaterials.find(m => m.id === materialId);

  const closeModal = () => {
    navigate(-1);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!material) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-notfound">
          <h2 className="notfound-title">Material Not Found</h2>
          <button onClick={closeModal} className="notfound-close-btn">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{material.title}</h2>
          <button onClick={closeModal} className="modal-close-btn" aria-label="Close modal">
            <X className="icon" />
          </button>
        </div>

        <div className="study-modal-content">
          <div className="info-grid">
            <div className="info-block">
              <BookOpen className="icon green" />
              <div>
                <p className="info-label">Subject</p>
                <p className="info-text">{material.subject}</p>
              </div>
            </div>

            <div className="info-block">
              <Calendar className="icon blue" />
              <div>
                <p className="info-label">Semester</p>
                <p className="info-text">{material.semester}</p>
              </div>
            </div>

            <div className="info-block">
              <User className="icon orange" />
              <div>
                <p className="info-label">Uploaded By</p>
                <p className="info-text">{material.uploadedBy}</p>
              </div>
            </div>
          </div>

          <div className="download-section">
            <div className="download-label">
              <Download className="icon green" />
              <span>Downloads - 28</span>
            </div>
          </div>

          <div className="about-section">
            <h3 className="about-title">About this Material</h3>
            <p className="about-text">
              This contains study materials for {material.subject} 
              for the {material.semester} semester. It is maintained by {material.uploadedBy}.
            </p>
          </div>

          <div className="footer-buttons">
            <button onClick={closeModal} className="close-button">Close</button>
            <button className="download-button">Download Material</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialModal;


