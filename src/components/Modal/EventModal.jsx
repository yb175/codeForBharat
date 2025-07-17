import React from "react";
import { useParams, useNavigate } from "react-router";
import { useApp } from "../../context/AppContext";
import { X, Calendar, Clock, MapPin, Users, User } from "lucide-react";
import "./EventModal.css"; // ✅ Import the new CSS file

const EventModal = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events } = useApp();

  const event = events.find((e) => e.id === eventId);

  const closeModal = () => navigate(-1);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  if (!event) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="event-modal-content">
          <div className="centered">
            <h2 className="modal-title">Event Not Found</h2>
            <button className="btn-primary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="event-modal-backdrop" onClick={handleBackdropClick}>
      <div className="event-modal-main">
        <div className="event-modal-header">
          <h2 className="event-modal-heading">{event.title}</h2>
        </div>

        <div className="event-modal-body">
          <div className="event-modal-grid">
            <div className="event-modal-item">
              <Calendar className="icon colored" />
              <div>
                <p className="event-label">Date</p>
                <p className="event-value">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="event-modal-item">
              <Clock className="icon colored green" />
              <div>
                <p className="event-label">Time</p>
                <p className="event-value">{event.time}</p>
              </div>
            </div>

            <div className="event-modal-item">
              <MapPin className="icon colored red" />
              <div>
                <p className="event-label">Location</p>
                <p className="event-value">{event.location}</p>
              </div>
            </div>

            <div className="event-modal-item">
              <User className="icon colored purple" />
              <div>
                <p className="event-label">Organizer</p>
                <p className="event-value">{event.organizer}</p>
              </div>
            </div>
          </div>

          <div className="event-modal-section">
            <h3 className="event-section-title">Description</h3>
            <p className="event-section-text">{event.description}</p>
          </div>

          <div className="event-modal-attendance">
            <div className="event-attendance-label">
              <Users className="icon colored" />
              <span>Attendance</span>
            </div>
            <div className="event-attendance-count">
              <p className="count">{event.registeredUsers}</p>
              {event.maxParticipants && (
                <p className="max-count">of {event.maxParticipants} max</p>
              )}
            </div>
          </div>

          <div className="event-modal-actions">
            <button className="btn-secondary" onClick={closeModal}>
              Close
            </button>
            <button className="btn-primary">Register for Event</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
