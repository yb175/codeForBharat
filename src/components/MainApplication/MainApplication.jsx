// MainApplication.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import AuthenticationPage from "../Authentication/AuthenticationPage";
import Navigation from "../Navigation/Navigation";
import Dashboard from "../Dashboard/Dashboard";
import Events from "../Events/Events";
import LostAndFound from "../LostAndFound/LostAndFound";
import StudyMaterials from "../StudyMaterials/StudyMaterials";
import StudyGroups from "../StudyGroups/StudyGroups";
import Leaderboard from "../Leaderboard/Leaderboard";
import MediaGallery from "../MediaGallery/MediaGallery";
import ReportingSystem from "../ReportingSystem/ReportingSystem";
import ContactReporter from "../LostAndFound/contactReporter";
import "./MainApplication.css";

const MainApplication = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Campus Connect...</p>
      </div>
    );
  }

  if (!user) return <AuthenticationPage />;

  return (
    <BrowserRouter>
      <Navigation />
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/lost-found" element={<LostAndFound />}>
              <Route path="contactReporter/:id" element={<ContactReporter/>} />
            </Route>
            <Route path="/study-materials" element={<StudyMaterials />} />
            <Route path="/study-groups" element={<StudyGroups />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/media" element={<MediaGallery />} />
            <Route path="/reports" element={<ReportingSystem />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default MainApplication;
