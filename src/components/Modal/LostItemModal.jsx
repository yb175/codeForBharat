import React from "react";
import { useParams, useNavigate } from "react-router";
import { useApp } from "../../context/AppContext";
import { X, Calendar, Clock, MapPin, User, Tag } from "lucide-react";
import "./LostItemModal.css"; // ✅ Import the new CSS

const LostItemModal = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { lostItems } = useApp();

  const item = lostItems.find((i) => i.id === itemId);

  const closeModal = () => navigate(-1);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  if (!item) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="lostItem-modal-content">
          <div className="centered">
            <h2 className="modal-title">Item Not Found</h2>
            <button className="btn-primary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lost-modal-backdrop" onClick={handleBackdropClick}>
      <div className="lost-modal-main">
        <div className="lost-modal-header">
          <h2 className="lost-modal-heading">{item.title}</h2>
        </div>

        <div className="lost-modal-body">
          <div className="lost-modal-grid">
            <div className="lost-modal-item">
              <Calendar className="icon colored" />
              <div>
                <p className="lost-label">Date Found</p>
                <p className="lost-value">
                  {new Date(item.dateFound).toLocaleDateString("en-US")}
                </p>
              </div>
            </div>

            <div className="lost-modal-item">
              <MapPin className="icon colored red" />
              <div>
                <p className="lost-label">Location</p>
                <p className="lost-value">{item.location}</p>
              </div>
            </div>

            <div className="lost-modal-item">
              <User className="icon colored purple" />
              <div>
                <p className="lost-label">Reported By</p>
                <p className="lost-value">{item.reportedBy}</p>
              </div>
            </div>

            <div className="lost-modal-item">
              <Tag className="icon colored green" />
              <div>
                <p className="lost-label">Category</p>
                <p className="lost-value">{item.category}</p>
              </div>
            </div>
          </div>

          <div className="lost-modal-section">
            <h3 className="lost-section-title">Description</h3>
            <p className="lost-section-text">{item.description}</p>
          </div>

          {item.image && (
            <div className="lost-image-wrapper">
              <img src={item.image} alt={item.title} className="lost-image" />
            </div>
          )}

          <div className="lost-modal-actions">
            <button className="btn-secondary" onClick={closeModal}>
              Close
            </button>
            <button className="btn-primary">Claim Item</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostItemModal;
