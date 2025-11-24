import React, { useState, useEffect } from "react";

const EventModal = ({ date, eventData, isOpen, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (eventData) {
      setTitle(eventData.title || "");
      setTime(eventData.time || "");
      setDuration(eventData.duration || "");
    } else {
      setTitle("");
      setTime("");
      setDuration("");
    }
  }, [eventData]);

  const handleSaveClick = () => {
    if (!title) return alert("Please enter a title");
    onSave({ title, time, duration, date });
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
        width: "90%",
        maxWidth: 500,
      }}
    >
      <h3 style={{ marginBottom: 15 }}>
        {eventData ? "Edit Event" : "Add Event"} - {date}
      </h3>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Duration</label>
        <input
          type="text"
          placeholder="e.g., 30m or 1h"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            backgroundColor: "#f1f3f4",
            color: "#202124",
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer",
            border: "none",
            fontWeight: 500,
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e8eaed")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f1f3f4")}
        >
          Cancel
        </button>

        {eventData && (
          <button
            type="button"
            onClick={() => onDelete(eventData)}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "8px 14px",
              borderRadius: 6,
              cursor: "pointer",
              border: "none",
              fontWeight: 500,
              transition: "0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f44336")}
          >
            Delete
          </button>
        )}

        <button
          type="button"
          onClick={handleSaveClick}
          style={{
            backgroundColor: "#1a73e8",
            color: "white",
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer",
            border: "none",
            fontWeight: 500,
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#155ab6")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1a73e8")}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EventModal;
