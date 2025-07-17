import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Outlet } from 'react-router';
import './Dashboard.css';

const Dashboard = () => {
  const { events, lostItems, studyMaterials, studyGroups, mediaItems, notifications } = useApp();

  const recentEvents = events.slice(0, 3);
  const recentLostItems = lostItems.slice(0, 3);
  const recentMaterials = studyMaterials.slice(0, 3);
  const recentGroups = studyGroups.slice(0, 3);
  const recentMedia = mediaItems.slice(0, 3);
  const unreadNotifications = notifications.filter(n => !n.read).slice(0, 5);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('campusUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const stats = [
    {
      title: 'Total Events',
      value: events.length,
      icon: '🎉',
      color: 'primary'
    },
    {
      title: 'Lost Items',
      value: lostItems.filter(item => item.status === 'lost').length,
      icon: '🔍',
      color: 'warning'
    },
    {
      title: 'Study Materials',
      value: studyMaterials.length,
      icon: '📚',
      color: 'secondary'
    },
    {
      title: 'Study Groups',
      value: studyGroups.length,
      icon: '👥',
      color: 'purple'
    },
    {
      title: 'Media Posts',
      value: mediaItems.length,
      icon: '📸',
      color: 'pink'
    },
    {
      title: 'Your Points',
      value: user?.points || 0,
      icon: '⭐',
      color: 'accent'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome back {user?.displayName || 'Student'}! 👋</h1>
        <p className="dashboard-subtitle">Here's what's happening on campus today</p>
      </div>
      <Outlet />
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-title">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2 className="section-title">Recent Events</h2>
          <div className="section-content">
            {recentEvents.length > 0 ? (
              recentEvents.map(event => (
                <Link key={event.id} to={`event/${event.id}`} className="dashboard-item-link">
                  <div className="dashboard-item">
                    <div className="item-icon">🎉</div>
                    <div className="item-content">
                      <h3 className="item-title">{event.title}</h3>
                      <p className="item-subtitle">{event.date} • {event.location}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="empty-state">No recent events</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Lost & Found</h2>
          <div className="section-content">
            {recentLostItems.length > 0 ? (
              recentLostItems.map(item => (
                <Link key={item.id} to={`lost-item/${item.id}`} className="dashboard-item-link">
                  <div className="dashboard-item">
                    <div className="item-icon">🔍</div>
                    <div className="item-content">
                      <h3 className="item-title">{item.title}</h3>
                      <p className="item-subtitle">{item.location} • {item.status}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="empty-state">No recent lost items</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Study Materials</h2>
          <div className="section-content">
            {recentMaterials.length > 0 ? (
              recentMaterials.map(material => (
                <Link key={material.id} to={`study-material/${material.id}`} className="dashboard-item-link">
                  <div className="dashboard-item">
                    <div className="item-icon">📚</div>
                    <div className="item-content">
                      <h3 className="item-title">{material.title}</h3>
                      <p className="item-subtitle">{material.subject} • {material.semester}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="empty-state">No recent materials</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Study Groups</h2>
          <div className="section-content">
            {recentGroups.length > 0 ? (
              recentGroups.map(group => (
                <Link key={group.id} to={`study-group/${group.id}`} className="dashboard-item-link">
                  <div className="dashboard-item">
                    <div className="item-icon">👥</div>
                    <div className="item-content">
                      <h3 className="item-title">{group.title}</h3>
                      <p className="item-subtitle">{group.subject} • {group.members.length} members</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="empty-state">No recent study groups</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Media Gallery</h2>
          <div className="section-content">
            {recentMedia.length > 0 ? (
              recentMedia.map(media => (
                <Link key={media.id} to={`media/${media.id}`} className="dashboard-item-link">
                  <div className="dashboard-item">
                    <div className="item-icon">📸</div>
                    <div className="item-content">
                      <h3 className="item-title">{media.title}</h3>
                      <p className="item-subtitle">{media.type} • {media.likes} likes</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="empty-state">No recent media</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Notifications</h2>
          <div className="section-content">
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map(notification => (
                <Link key={notification.id} to={`notification/${notification.id}`} className="dashboard-item-link">
                  <div className="dashboard-item">
                    <div className="item-icon">🔔</div>
                    <div className="item-content">
                      <h3 className="item-title">{notification.title}</h3>
                      <p className="item-subtitle">{notification.message}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="empty-state">No new notifications</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;