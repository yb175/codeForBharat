import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { X, Heart, User, Calendar, Camera, Video } from 'lucide-react';
import './MediaModal.css'; // Import the CSS file

const MediaModal = () => {
  const { mediaId } = useParams();
  const navigate = useNavigate();
  const { mediaItems } = useApp();

  const media = mediaItems.find(m => m.id === mediaId);

  const closeModal = () => {
    navigate(-1);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!media) {
    return (
      <div className="media-modal-backdrop" onClick={handleBackdropClick}>
        <div className="media-modal-container">
          <div className="media-modal-content">
            <h2>Media Not Found</h2>
            <button onClick={closeModal} className="btn-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="media-modal-backdrop" onClick={handleBackdropClick}>
      <div className="media-modal-box">
        <div className="media-modal-header">
          <h2>{media.title}</h2>
          <button onClick={closeModal} className="icon-button">
            <X className="icon" />
          </button>
        </div>

        <div className="media-modal-body">
          <div className="media-type-indicator">
            {media.type === 'photo' ? <Camera className="media-icon" /> : <Video className="media-icon" />}
            <span className="media-type-label">{media.type === 'photo' ? 'Photo' : 'Video'}</span>
          </div>

          <div className="media-preview">
            {media.type === 'photo' ? (
              <img src={media.url} alt={media.title} className="media-image" />
            ) : (
              <div className="video-placeholder">
                <Video className="icon-large" />
                <p>Video preview not available</p>
              </div>
            )}
          </div>

          <div className="media-info-grid">
            <div className="info-item">
              <User className="info-icon blue" />
              <div>
                <p className="info-title">Uploaded By</p>
                <p className="info-text">{media.uploadedBy}</p>
              </div>
            </div>

            <div className="info-item">
              <Calendar className="info-icon green" />
              <div>
                <p className="info-title">Upload Date</p>
                <p className="info-text">{new Date(media.uploadDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="info-item">
              <Heart className="info-icon red" />
              <div>
                <p className="info-title">Likes</p>
                <p className="info-text">{media.likes} likes</p>
              </div>
            </div>
          </div>

          <div className="media-engagement">
            <div className="engagement-label">
              <Heart className="engagement-icon" />
              <span>Engagement</span>
            </div>
            <div className="engagement-stats">
              <p>{media.likes}</p>
              <p className="engagement-sub">total likes</p>
            </div>
          </div>

          <div className="modal-actions">
            <button onClick={closeModal} className="btn-secondary">
              Close
            </button>
            <button className="btn-like">
              <Heart className="like-icon" />
              <span>Like</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;

