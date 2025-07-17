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
import BuyAndSell from "../BuyAndSell/BuyAndSell";
import MediaGallery from "../MediaGallery/MediaGallery";
import ReportingSystem from "../ReportingSystem/ReportingSystem";
import ContactReporter from "../LostAndFound/contactReporter";
import SemForm from "../StudyMaterials/semForm";
import "./MainApplication.css";
import EventModal from "../Modal/EventModal";
import LostItemModal from "../Modal/LostItemModal";
import MediaModal from "../Modal/MediaModal";
import NotificationModal from "../Modal/NotificationModal";
import StudyGroupModal from "../Modal/StudyGroupModal";
import StudyMaterialModal from "../Modal/StudyMaterialModal";

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
              <Route path="semform" element={<SemForm />}></Route>
            <Route/>
            <Route path="/study-groups" element={<StudyGroups />} />
            <Route path="/buy-and-sell" element={<BuyAndSell />} />
            <Route path="/media" element={<MediaGallery />} />
            <Route path="/reports" element={<ReportingSystem />} />

            <Route path="/event/:eventId" element={<EventModal />} />
            <Route path="/lost-item/:itemId" element={<LostItemModal />} />
            <Route path="/media/:mediaId" element={<MediaModal />} />
            <Route path="/study-group/:groupId" element={<StudyGroupModal />} />
            <Route path="/study-material/:materialId" element={<StudyMaterialModal />} />
            <Route path="/notification/:notificationId" element={<NotificationModal />} />
            
    
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default MainApplication;
