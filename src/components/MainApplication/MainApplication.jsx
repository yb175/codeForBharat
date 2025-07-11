import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthenticationPage from '../Authentication/AuthenticationPage';
import Dashboard from '../Dashboard/Dashboard';
import Navigation from '../Navigation/Navigation';
import Events from '../Events/Events';
import LostAndFound from '../LostAndFound/LostAndFound';
import StudyMaterials from '../StudyMaterials/StudyMaterials';
import StudyGroups from '../StudyGroups/StudyGroups';
import Leaderboard from '../Leaderboard/Leaderboard';
import MediaGallery from '../MediaGallery/MediaGallery';
import ReportingSystem from '../ReportingSystem/ReportingSystem';
import './MainApplication.css';

const MainApplication = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Campus Connect...</p>
      </div>
    );
  }

  if (!user) {
    return <AuthenticationPage />;
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'events':
        return <Events />;
      case 'lost-found':
        return <LostAndFound />;
      case 'study-materials':
        return <StudyMaterials />;
      case 'study-groups':
        return <StudyGroups />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'media':
        return <MediaGallery />;
      case 'reports':
        return <ReportingSystem />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="main-application">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <div className="container">
          {renderActiveComponent()}
        </div>
      </main>
    </div>
  );
};

export default MainApplication;