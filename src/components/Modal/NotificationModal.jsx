import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { X, Bell, Calendar, Tag, CheckCircle } from 'lucide-react';
import './NotificationModal.css';

const NotificationModal = () => {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const { notifications } = useApp();

  const notification = notifications.find(n => n.id === notificationId);

  const closeModal = () => {
    navigate(-1);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!notification) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-container">
          <div className="modal-center">
            <h2 className="modal-title">Notification Not Found</h2>
            <button onClick={closeModal} className="modal-close-button">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="notification-modal-content">
        <div className="modal-header">
          <h2 className="modal-header-title">{notification.title}</h2>
          <button
            onClick={closeModal}
            className="modal-close-icon"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-status">
            <Bell className="w-6 h-6 text-orange-500" />
            <span className={`modal-status-badge ${notification.read ? 'read' : 'unread'}`}>
              {notification.read ? 'Read' : 'Unread'}
            </span>
          </div>

          <div className="modal-grid">
            <div className="modal-detail">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-sm">{new Date(notification.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="modal-detail">
              <Tag className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-medium">Type</p>
                <p className="text-sm capitalize">{notification.type}</p>
              </div>
            </div>
          </div>

          <div className="modal-message">
            <h3 className="font-semibold text-gray-800 mb-2">Message</h3>
            <p className="text-gray-600 leading-relaxed">{notification.message}</p>
          </div>

          {!notification.read && (
            <div className="modal-unread-warning">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-orange-800">This notification is unread</span>
              </div>
              <p className="text-sm text-orange-600 mt-1">
                Mark as read to remove it from your unread notifications.
              </p>
            </div>
          )}

          <div className="modal-buttons">
            <button onClick={closeModal} className="modal-button-secondary">
              Close
            </button>
            {!notification.read && (
              <button className="modal-button-primary">
                <CheckCircle className="w-4 h-4" />
                <span>Mark as Read</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;

