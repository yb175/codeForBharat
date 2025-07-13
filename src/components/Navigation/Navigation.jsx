import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Navigation.css';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/dashboard' ,label:'Home',icon: '🏠' },
    { path: '/events', label: 'Events', icon: '🎉' },
    { path: '/lost-found', label: 'Lost & Found', icon: '🔍' },
    { path: '/study-materials', label: 'Study Materials', icon: '📚' },
    { path: '/study-groups', label: 'Study Groups', icon: '👥' },
    { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
    { path: '/media', label: 'Media Gallery', icon: '📸' },
    { path: '/reports', label: 'Report Issue', icon: '🚨' }
  ];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/'); // optional: navigate to homepage or login
  };

  return (
    <nav className="navigation">
      <div className="nav-container nav-container--vertical">
        <div className="nav-top-row">
          <div className="nav-brand">
            <h1 className="nav-title">Campus Connect</h1>
            <span className="nav-subtitle">Digital Ecosystem</span>
          </div>
          <div className="nav-user">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="nav-desktop">
          <ul className="nav-links">
            {navigationItems.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
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
          <ul className="mobile-nav-links">
            {navigationItems.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
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