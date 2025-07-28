import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { X, Heart, User, Calendar } from 'lucide-react';
import './MediaModal.css';

const MediaModal = () => {
  const { mediaId } = useParams();
  const navigate = useNavigate();
  const { mediaItems } = useApp();

  const media = mediaItems.find((m) => m.id === mediaId);

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
      <div className="media-modal__backdrop" onClick={handleBackdropClick}>
        <div className="media-modal__container">
          <div className="media-modal__not-found">
            <h2>Media Not Found</h2>
            <button onClick={closeModal} className="media-modal__btn-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="media-modal__backdrop" onClick={handleBackdropClick}>
      <div className="media-modal__box">
        <div className="media-modal__header">
          <h2>{media.title}</h2>
          <button onClick={closeModal} className="media-modal__icon-btn">
            <X className="media-modal__icon" />
          </button>
        </div>

        <div className="media-modal__body">
          <div className="media-modal__preview">
            <img
              src={media.imageUrl}
              alt={media.title}
              className="media-modal__image"
            />
          </div>

          <div className="media-modal__info-grid">
            <div className="media-modal__info-item">
              <User className="media-modal__info-icon blue" />
              <div>
                <p className="media-modal__info-title">Uploaded By</p>
                <p className="media-modal__info-text">{media.uploadedBy}</p>
              </div>
            </div>

            <div className="media-modal__info-item">
              <Calendar className="media-modal__info-icon green" />
              <div>
                <p className="media-modal__info-title">Upload Date</p>
                <p className="media-modal__info-text">
                  {new Date(media.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="media-modal__info-item">
              <Heart className="media-modal__info-icon red" />
              <div>
                <p className="media-modal__info-title">Likes</p>
                <p className="media-modal__info-text">{media.likes} likes</p>
              </div>
            </div>
          </div>

          <div className="media-modal__engagement">
            <div className="media-modal__engagement-label">
              <Heart className="media-modal__engagement-icon" />
              <span>Engagement</span>
            </div>
            <div className="media-modal__engagement-stats">
              <p>{media.likes}</p>
              <p className="media-modal__engagement-sub">total likes</p>
            </div>
          </div>

          <div className="media-modal__actions">
            <button
              onClick={closeModal}
              className="media-modal__btn-secondary"
            >
              Close
            </button>
            <button className="media-modal__btn-like">
              <Heart className="media-modal__like-icon" />
              <span>Like</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
