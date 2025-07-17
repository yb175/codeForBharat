import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { X, Users, BookOpen, MapPin, Clock, UserPlus } from 'lucide-react';
import './StudyGroupModal.css';

const StudyGroupModal = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { studyGroups } = useApp();

  const group = studyGroups.find(g => g.id === groupId);

  const closeModal = () => navigate(-1);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  if (!group) {
    return (
      <div className="modal-overlay" onClick={handleBackdropClick}>
        <div className="modal-container">
          <div className="modal-content-center">
            <h2 className="modal-heading">Study Group Not Found</h2>
            <button onClick={closeModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">{group.title}</h2>
          <button onClick={closeModal} className="modal-close-icon" aria-label="Close modal">
            <X className="icon" />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-grid">
            <div className="modal-info">
              <BookOpen className="icon purple" />
              <div>
                <p className="label">Subject</p>
                <p className="value">{group.subject}</p>
              </div>
            </div>

            <div className="modal-info">
              <Clock className="icon blue" />
              <div>
                <p className="label">Meeting Time</p>
                <p className="value">{group.meetingTime}</p>
              </div>
            </div>

            <div className="modal-info">
              <MapPin className="icon red" />
              <div>
                <p className="label">Location</p>
                <p className="value">{group.location}</p>
              </div>
            </div>

            <div className="modal-info">
              <Users className="icon green" />
              <div>
                <p className="label">Members</p>
                <p className="value">{group.members.length} of {group.maxMembers}</p>
              </div>
            </div>
          </div>

          <div className="section description">
            <h3 className="section-title">Description</h3>
            <p className="section-text">{group.description}</p>
          </div>

          <div className="section members">
            <h3 className="section-title">Current Members</h3>
            <div className="member-list">
             {group.members.length}
            </div>
          </div>

          <div className="section available">
            <div className="available-info">
              <UserPlus className="icon blue" />
              <span className="label blue-label">Available Spots</span>
            </div>
            <div className="available-count">
              <p className="available-number">{group.maxMembers - group.members.length}</p>
              <p className="value blue">spots remaining</p>
            </div>
          </div>

          <div className="modal-footer">
            <button onClick={closeModal} className="close-button outlined">Close</button>
            <button className="join-button">Join Study Group</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroupModal;

