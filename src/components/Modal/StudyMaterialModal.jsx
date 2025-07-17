import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { X, BookOpen, User, Download, Calendar, FileText } from 'lucide-react';
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
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Material Not Found</h2>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{material.title}</h2>
          <button
            onClick={closeModal}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="modal-content">
          <div className="info-grid">
            <div className="info-block">
              <BookOpen className="w-5 h-5 text-green-500" />
              <div>
                <p className="info-block-title">Subject</p>
                <p className="info-block-text">{material.subject}</p>
              </div>
            </div>

            <div className="info-block">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="info-block-title">Semester</p>
                <p className="info-block-text">{material.semester}</p>
              </div>
            </div>

            <div className="info-block">
              <FileText className="w-5 h-5 text-purple-500" />
              <div>
                <p className="info-block-title">Type</p>
                <p className="info-block-text">{material.type}</p>
              </div>
            </div>

            <div className="info-block">
              <User className="w-5 h-5 text-orange-500" />
              <div>
                <p className="info-block-title">Uploaded By</p>
                <p className="info-block-text">{material.uploadedBy}</p>
              </div>
            </div>
          </div>

          <div className="download-section">
            <div className="download-label">
              <Download className="w-5 h-5 text-green-500" />
              <span>Downloads</span>
            </div>
            <div className="text-right">
              <p className="download-count">{material.downloadCount}</p>
              <p className="download-note">total downloads</p>
            </div>
          </div>

          <div className="about-section">
            <h3 className="about-title">About this Material</h3>
            <p className="about-text">
              This {material.type.toLowerCase()} contains study materials for {material.subject} 
              for the {material.semester} semester. It has been downloaded {material.downloadCount} times 
              by students and is maintained by {material.uploadedBy}.
            </p>
          </div>

          <div className="footer-buttons">
            <button onClick={closeModal} className="close-button">
              Close
            </button>
            <button className="download-button">
              Download Material
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialModal;

