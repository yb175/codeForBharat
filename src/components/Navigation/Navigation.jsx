import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Navigation.css';

const Navigation = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'events', label: 'Events', icon: '🎉' },
    { id: 'lost-found', label: 'Lost & Found', icon: '🔍' },
    { id: 'study-materials', label: 'Study Materials', icon: '📚' },
    { id: 'study-groups', label: 'Study Groups', icon: '👥' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    { id: 'media', label: 'Media Gallery', icon: '📸' },
    { id: 'reports', label: 'Report Issue', icon: '🚨' }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h1 className="nav-title">Campus Connect</h1>
          <span className="nav-subtitle">Digital Ecosystem</span>
        </div>

        <div className="nav-desktop">
          <ul className="nav-links">
            {navigationItems.map(item => (
              <li key={item.id}>
                <button
                  className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => handleTabClick(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-user">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <div className="user-points">
              <span className="points-icon">⭐</span>
              <span className="points-value">{user?.points || 0}</span>
            </div>
          </div>
          
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="nav-mobile">
          <div className="mobile-user-info">
            <span className="mobile-user-name">{user?.name}</span>
            <div className="mobile-user-points">
              <span className="points-icon">⭐</span>
              <span className="points-value">{user?.points || 0}</span>
            </div>
          </div>
          
          <ul className="mobile-nav-links">
            {navigationItems.map(item => (
              <li key={item.id}>
                <button
                  className={`mobile-nav-link ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => handleTabClick(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
          
          <div className="mobile-actions">
            <button className="mobile-theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
            <button className="mobile-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;