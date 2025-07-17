import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, MapPin, User, Tag } from 'lucide-react';
import './LostItemModal.css'; // ✅ Import the new CSS

const LostItemModal = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { lostItems } = useApp();

  const item = lostItems.find(i => i.id === itemId);

  const closeModal = () => navigate(-1);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  if (!item) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-content">
          <div className="centered">
            <h2 className="modal-title">Item Not Found</h2>
            <button className="btn-primary" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-main">
        <div className="modal-header">
          <h2 className="modal-heading">{item.title}</h2>
          <button onClick={closeModal} className="btn-icon" aria-label="Close modal">
            <X className="icon" />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-grid">
            <div className="modal-item">
              <Calendar className="icon colored" />
              <div>
                <p className="label">Date Found</p>
                <p className="value">{new Date(item.dateFound).toLocaleDateString('en-US')}</p>
              </div>
            </div>

            <div className="modal-item">
              <MapPin className="icon colored red" />
              <div>
                <p className="label">Location</p>
                <p className="value">{item.location}</p>
              </div>
            </div>

            <div className="modal-item">
              <User className="icon colored purple" />
              <div>
                <p className="label">Reported By</p>
                <p className="value">{item.reportedBy}</p>
              </div>
            </div>

            <div className="modal-item">
              <Tag className="icon colored green" />
              <div>
                <p className="label">Category</p>
                <p className="value">{item.category}</p>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="section-title">Description</h3>
            <p className="section-text">{item.description}</p>
          </div>

          {item.image && (
            <div className="image-wrapper">
              <img src={item.image} alt={item.title} className="image" />
            </div>
          )}

          <div className="modal-actions">
            <button className="btn-secondary" onClick={closeModal}>Close</button>
            <button className="btn-primary">Claim Item</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostItemModal;



