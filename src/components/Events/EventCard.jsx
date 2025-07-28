import React, { useState } from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  // 📅 Formats date strings nicely
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 🎨 Maps category to color
  const getCategoryColor = (category) => {
    const colors = {
      technology: "primary",
      cultural: "secondary",
      sports: "accent",
      career: "secondary",
      others: "pink",
    };
    return colors[category?.toLowerCase?.()] || colors.others;
  };

  // ✅ Safely compute registered count
  const registeredCount = Array.isArray(event?.registeredUsers)
    ? event.registeredUsers.length
    : 0;

  // ✅ Make sure maxParticipants is a valid number
  const maxParticipants = Number(event?.maxParticipants) || 0;

  // 🧮 Calculate spots left safely
  const spotsLeft = maxParticipants ? maxParticipants - registeredCount : null;

  // 🌐 Handle registration
  const handleRegister = () => {
    if (event.registrationLink && event.registrationLink.trim() !== "") {
      window.open(event.registrationLink, "_blank");
    } else {
      setIsRegistered(true);
    }
  };

  return (
    <div className="event-card">
      <div className="event-image relative aspect-video w-full">
        <img className=" w-full h-full"
          src={event?.image || event.hackathon_setting?.logo || event?.logo}
          alt={event.title}
        />
        <div className={`event-category ${getCategoryColor(event?.category || event?.type)}`}>
          {event?.category || event?.type}
        </div>
      </div>

      <div className="event-content">
        <h3 className="event-title">{event?.title || event.name}</h3>
        <p className="event-description">
          {event?.description || event.tagline}
        </p>

        <div className="event-details">
          <div className="event-detail">
            <span className="detail-icon">📅</span>
            <span className="detail-text">
              {event?.date
                ? formatDate(event?.date)
                : `Registration closes at ${formatDate(event?.ends_at)}`}
            </span>
          </div>

          <div className="event-detail">
            <span className="detail-icon">🕐</span>
            <span className="detail-text">
              {event?.time || "Not available"}
            </span>
          </div>

          <div className="event-detail">
            <span className="detail-icon">📍</span>
            <span className="detail-text">
              {event?.location
                ? event.location
                : event?.is_online
                ? "Online"
                : "Offline"}
            </span>
          </div>

          <div className="event-detail">
            <span className="detail-icon">👥</span>
            <span className="detail-text">
              {event?.organizer || event.hackathon_settings?.instagram}
            </span>
          </div>
        </div>

        <div className="event-stats">
          <div className="stat">
            <span className="stat-value">
              {registeredCount + (isRegistered ? 1 : 0)}
            </span>
            <span className="stat-label">Registered</span>
          </div>

          <div className="stat">
            <span className="stat-value">
              {spotsLeft !== null
                ? Math.max(spotsLeft - (isRegistered ? 1 : 0), 0)
                : "N/A"}
            </span>
            <span className="stat-label">Spots Left</span>
          </div>

          <div className="stat">
            <span className="stat-value">
              {Math.round(event?.points || Math.random() * 50)}
            </span>
            <span className="stat-label">Points</span>
          </div>
        </div>
      </div>

      <div className="event-actions">
        <button
          className={`btn ${
            isRegistered ? "btn-outline" : "btn-primary"
          } register-btn`}
          onClick={handleRegister}
          disabled={spotsLeft !== null && spotsLeft <= 0 && !isRegistered}
        >
          {event.registrationLink
            ? "Register on Website"
            : isRegistered
            ? "Registered ✓"
            : spotsLeft !== null && spotsLeft <= 0
            ? "Event Full"
            : "Register Now"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
