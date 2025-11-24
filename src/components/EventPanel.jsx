import React from "react";
import "./Calendar.css";

const EventPanel = ({ activeDay, events, onEdit, onDelete }) => {
  if (!activeDay) return <div className="event-panel empty">Select a date</div>;

  const dayEvents = events.filter(ev => ev.date === activeDay);

  return (
    <div className="event-panel">
      <h2>Events on {activeDay}</h2>

      {dayEvents.length === 0 && (
        <p className="no-events">No events for this day</p>
      )}

      {dayEvents.map((ev, idx) => (
        <div key={idx} className="panel-event">
          <div className="panel-title">{ev.title}</div>
          <div className="panel-time">{ev.time}</div>

          <button className="panel-btn edit" onClick={() => onEdit(ev)}>Edit</button>
          <button className="panel-btn delete" onClick={() => onDelete(ev)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EventPanel;
