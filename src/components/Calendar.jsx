import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import EventModal from "./EventModal";
import "./Calendar.css";
import emailjs from "emailjs-com";


const Calendar = ({ events = [] }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(true);
  const [eventList, setEventList] = useState(
    events.map((ev) => ({ ...ev, id: ev.id || Date.now() + Math.random() }))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [topPanelOpen, setTopPanelOpen] = useState(false);
  const [activeDay, setActiveDay] = useState("");

  useEffect(() => {
    if (showPopup) {
      const canvas = document.getElementById("confetti-canvas");
      if (canvas) {
        const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
        myConfetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
      }
    }
    const timer = setTimeout(() => setShowPopup(false), 2000);
    return () => clearTimeout(timer);
  }, [showPopup]);

  const getGreeting = () => {
    const hour = today.getHours();
    if (hour >= 5 && hour < 12) return "Good Morning ☀️";
    if (hour >= 12 && hour < 17) return "Good Afternoon 🌤️";
    if (hour >= 17 && hour < 20) return "Good Evening 🌙";
    return "Good Night 🌙";
  };
  const greeting = getGreeting();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  const handlePrev = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNext = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDate = (day) =>
    eventList.filter((e) => {
      let d, m, y;
      if (/^\d{4}-\d{2}-\d{2}$/.test(e.date)) [y, m, d] = e.date.split("-");
      else if (/^\d{2}-\d{2}-\d{4}$/.test(e.date)) [d, m, y] = e.date.split("-");
      else return false;
      const eventDate = new Date(Number(y), Number(m) - 1, Number(d));
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });

  const handleDateClick = (day) => {
    const dd = String(day).padStart(2, "0");
    const mm = String(month + 1).padStart(2, "0");
    const yyyy = year;
    setActiveDay(`${dd}-${mm}-${yyyy}`);
    setTopPanelOpen(true);
  };

  const handleDateDoubleClick = (day) => {
    const dd = String(day).padStart(2, "0");
    const mm = String(month + 1).padStart(2, "0");
    const yyyy = year;
    setModalDate(`${dd}-${mm}-${yyyy}`);
    setEditingEvent(null);
    setModalOpen(true);
  };
const sendEmailNotification = (event) => {
  emailjs.send(
    "YOUR_SERVICE_ID",    // replace with your EmailJS service ID
    "YOUR_TEMPLATE_ID",   // replace with your EmailJS template ID
    {
      to_name: "Pooja",         // recipient name (can be dynamic)
      event_title: event.title,
      event_date: event.date,
      event_time: event.time,
    },
    "YOUR_PUBLIC_KEY"      // replace with your EmailJS public key
  )
  .then(() => {
    console.log("Email sent successfully!");
  })
  .catch((err) => {
    console.error("Email sending error:", err);
  });
};

  const handleSaveEvent = (payload) => {
  const newEvent = editingEvent?.id
    ? { ...editingEvent, ...payload }
    : { ...payload, date: modalDate, id: Date.now() };

  if (!editingEvent?.id) {
    sendEmailNotification(newEvent);
  }

  if (editingEvent?.id) {
    setEventList((prev) =>
      prev.map((ev) => (ev.id === editingEvent.id ? newEvent : ev))
    );
  } else {
    setEventList((prev) => [...prev, newEvent]);
  }

  setModalOpen(false);
  setEditingEvent(null);
};

  const handleDeleteEvent = (evToDelete) => {
    setEventList((prev) => prev.filter((ev) => ev.id !== evToDelete.id));
    setModalOpen(false);
    setEditingEvent(null);
  };

  const eventColors = ["#e91e63", "#ff9800", "#4caf50", "#2196f3", "#9c27b0", "#f44336", "#009688"];

  const TopEventPanel = ({ open, activeDay, events }) => {
    if (!open) return null;
    const dayEvents = events.filter((ev) => ev.date === activeDay);

    return (
      <div
        style={{
          width: "95%",
          maxWidth: 950,
          margin: "20px auto",
          background: "white",
          padding: 12,
          boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
          borderRadius: 8,
          position: "relative",
          zIndex: 10
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Events on {activeDay}</h3>
          <button
            type="button"
            onClick={() => setTopPanelOpen(false)}
            style={{ fontSize: 20, border: "none", background: "transparent", cursor: "pointer" }}
          >
            ×
          </button>
        </div>

        {dayEvents.length === 0 && (
          <>
            <p style={{ color: "#555" }}>No events yet.</p>
            <button
              type="button"
              onClick={() => { setEditingEvent(null); setModalDate(activeDay); setModalOpen(true); }}
              style={{ background: "#007bff", color: "white", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer", marginTop: 10, fontSize: 12 }}
            >
              + Add Event
            </button>
          </>
        )}

        {dayEvents.map((ev, idx) => (
          <div key={ev.id} style={{ padding: 8, borderBottom: "1px solid #ddd", marginBottom: 8 }}>
            <strong>{ev.title}</strong>
            <div style={{ fontSize: 12 }}>{ev.time}</div>
            <div style={{ fontSize: 12, color: "#666" }}>{ev.duration}</div>
          </div>
        ))}

        {dayEvents.length > 0 && (
          <button
            type="button"
            onClick={() => { setEditingEvent(null); setModalDate(activeDay); setModalOpen(true); }}
            style={{ background: "#007bff", color: "white", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer", width: "100%", marginTop: 10, fontSize: 12 }}
          >
            + Add Another Event
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-wrapper" style={{ padding: 20, position: "relative" }}>
      <TopEventPanel open={topPanelOpen} activeDay={activeDay} events={eventList} />

      {showPopup && (
        <div className="popup-overlay">
          <canvas id="confetti-canvas" className="confetti-canvas"></canvas>
          <div className="popup-box">{greeting}</div>
        </div>
      )}

      {/* Calendar Header with Month & Year Dropdown */}
      <div className="calendar-header" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button type="button" onClick={handlePrev}>Prev</button>

        {/* Month Dropdown */}
        <select
          value={currentDate.getMonth()}
          onChange={(e) => setCurrentDate(new Date(currentDate.getFullYear(), Number(e.target.value), 1))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        {/* Year Dropdown */}
        <select
          value={currentDate.getFullYear()}
          onChange={(e) => setCurrentDate(new Date(Number(e.target.value), currentDate.getMonth(), 1))}
        >
          {Array.from({ length: 50 }, (_, i) => {
            const y = new Date().getFullYear() - 25 + i; // ±25 years range
            return <option key={y} value={y}>{y}</option>;
          })}
        </select>

        <button type="button" onClick={handleNext}>Next</button>
      </div>

      <div className="days-row">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="day-name">{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {Array(startDay).fill(null).map((_, i) => <div key={"empty-" + i} className="empty-cell"></div>)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const dayEvents = getEventsForDate(day);

          return (
            <div
              key={day}
              className={`date-cell ${isToday ? "today" : ""}`}
              onClick={() => handleDateClick(day)}
              onDoubleClick={() => handleDateDoubleClick(day)}
            >
              <span className="date-number">{day}</span>
              {dayEvents.map((ev, idx) => {
                const color = eventColors[idx % eventColors.length];
                return (
                  <div key={ev.id} style={{ color, fontSize: 12, marginTop: 2 }}>
                    <strong>{ev.title}</strong>
                    <div style={{ fontSize: 11, color: "#555" }}>{ev.time}</div>
                    <div style={{ fontSize: 11, color: "#555" }}>{ev.duration}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div
          onClick={() => { setModalOpen(false); setEditingEvent(null); }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: "95%", maxWidth: 700 }}>
            <EventModal
              date={modalDate}
              eventData={editingEvent}
              isOpen={modalOpen}
              onClose={() => { setModalOpen(false); setEditingEvent(null); }}
              onSave={handleSaveEvent}
              onDelete={handleDeleteEvent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
