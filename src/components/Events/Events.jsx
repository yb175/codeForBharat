import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import EventCard from "./EventCard";
import EventForm from "./EventForm";
import "./Events.css";
import { hackathons } from "../../data/mockData";

const Events = () => {
  const { events, registerForEvent, addEvent } = useApp();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const data = [...events, ...hackathons];
  const filteredEvents = data.filter((event) => {
    const matchesSearch =
      event?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event?.tagline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      event?.category?.toLowerCase() === filter.toLowerCase() ||
      event?.type?.toLowerCase() === filter.toLowerCase() ||
      (filter === "registered" &&
        (event?.registeredUsers || []).includes(currentUser?.uid));
    return matchesSearch && matchesFilter;
  });

  const handleRegister = (eventId) => {
    registerForEvent(eventId, user?.id);
  };

  const handleAddEvent = (eventData) => {
    addEvent({
      ...eventData,
      organizer: user?.name || "Unknown",
    });
    setShowForm(false);
  };

  const categories = [
    "all",
    "technology",
    "cultural",
    "sports",
    "career",
    "hackathon",
  ];

  return (
    <div className="events">
      <div className="events-header">
        <h1 className="events-title">Campus Events</h1>
        <p className="events-subtitle">
          Discover and participate in exciting campus activities
        </p>
      </div>

      <div className="events-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-tab ${filter === category ? "active" : ""}`}
              onClick={() => setFilter(category)}
            >
              {category === "all"
                ? "All Events"
                : category === "registered"
                ? "My Events"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <button
          className="btn btn-primary add-event-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Event
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EventForm
              onSubmit={handleAddEvent}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={() => handleRegister(event?.id || ``)}
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎉</div>
            <h3>No events found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
