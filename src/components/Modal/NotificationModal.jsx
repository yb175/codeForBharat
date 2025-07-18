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

  const closeModal = () => navigate(-1);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!notification) {
    return (
      <div className="notif-backdrop" onClick={handleBackdropClick}>
        <div className="notif-container">
          <div className="notif-center">
            <h2 className="notif-title">Notification Not Found</h2>
            <button onClick={closeModal} className="notif-close-button">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notif-backdrop" onClick={handleBackdropClick}>
      <div className="notif-content">
        <div className="notif-header">
          <h2 className="notif-header-title">{notification.title}</h2>
          <button onClick={closeModal} className="notif-close-icon" aria-label="Close modal">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="notif-body">
          <div className="notif-status">
            <Bell className="w-6 h-6 text-orange-500" />
            <span className={`notif-badge ${notification.read ? 'read' : 'unread'}`}>
              {notification.read ? 'Read' : 'Unread'}
            </span>
          </div>

          <div className="notif-grid">
            <div className="notif-detail">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-sm">{new Date(notification.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="notif-detail">
              <Tag className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-medium">Type</p>
                <p className="text-sm capitalize">{notification.type}</p>
              </div>
            </div>
          </div>

          <div className="notif-message">
            <h3 className="font-semibold mb-2">Message</h3>
            <p>{notification.message}</p>
          </div>

          {!notification.read && (
            <div className="notif-warning">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-orange-500" />
                <span className="font-medium">This notification is unread</span>
              </div>
              <p className="text-sm mt-1">
                Mark as read to remove it from your unread notifications.
              </p>
            </div>
          )}

          <div className="notif-buttons">
            <button onClick={closeModal} className="notif-btn-secondary">
              Close
            </button>
            {!notification.read && (
              <button className="notif-btn-primary">
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


