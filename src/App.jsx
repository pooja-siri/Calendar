import React, { useState } from "react";
import Calendar from "./components/Calendar";

const events = [
  { title: "Team Meeting", date: "10-11-2025", time: "10:00 AM", duration: "1h" },
  { title: "Doctor Appointment", date: "10-11-2025", time: "3:00 PM", duration: "30m" },
  { title: "Birthday Party", date: "18-11-2025", time: "7:00 PM", duration: "2h" },
  { title: "Project Deadline", date: "20-11-2025", time: "11:59 PM", duration: "All day" },
  { title: "Client Call", date: "12-11-2025", time: "2:00 PM", duration: "1h" },
  { title: "Team Lunch", date: "15-11-2025", time: "1:00 PM", duration: "2h" },
  { title: "Workshop", date: "22-11-2025", time: "10:00 AM", duration: "3h" },
  { title: "Webinar", date: "25-11-2025", time: "4:00 PM", duration: "2h" },
  { title: "Planning Meeting", date: "28-10-2025", time: "11:00 AM", duration: "1h" },
  { title: "Code Review", date: "30-10-2025", time: "3:00 PM", duration: "2h" },
  { title: "Team Outing", date: "15-10-2025", time: "12:00 PM", duration: "4h" },
  { title: "Product Demo", date: "20-10-2025", time: "2:00 PM", duration: "1.5h" },
  { title: "Sprint Planning", date: "05-10-2025", time: "10:00 AM", duration: "2h" },
  { title: "Christmas Party", date: "24-12-2025", time: "7:00 PM", duration: "3h" },
  { title: "Year-End Review", date: "31-12-2025", time: "2:00 PM", duration: "2h" },
  { title: "New Project Kickoff", date: "05-12-2025", time: "11:00 AM", duration: "1.5h" },
  { title: "Client Presentation", date: "10-12-2025", time: "3:00 PM", duration: "2h" },
  { title: "Holiday Gathering", date: "20-12-2025", time: "6:00 PM", duration: "3h" }
];


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("Calendar"); // Calendar is default page

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      
      <div
        style={{
          width: sidebarOpen ? 250 : 0,
          transition: "width 0.3s",
          backgroundColor: "#1f2937",
          color: "white",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          padding: sidebarOpen ? "20px" : 0,
          boxShadow: sidebarOpen ? "2px 0 8px rgba(0,0,0,0.2)" : "none",
          position: "relative"
        }}
      >
        {sidebarOpen && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 30
              }}
            >
              <img
                src="https://i.pravatar.cc/80"
                alt="avatar"
                style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: 10 }}
              />
              <h3 style={{ margin: 0, fontSize: 18 }}>Siri</h3>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>Admin</p>
            </div>

            <nav style={{ flexGrow: 1 }}>
              {["Dashboard", "Calendar", "Settings"].map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActivePage(link); }}
                  style={{
                    display: "block",
                    padding: "10px 15px",
                    borderRadius: 6,
                    marginBottom: 8,
                    color: activePage === link ? "#3b82f6" : "white",
                    fontWeight: activePage === link ? 600 : 400,
                    textDecoration: "none",
                    transition: "0.2s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {link}
                </a>
              ))}
            </nav>
          </>
        )}
      </div>

      <div style={{ flexGrow: 1, padding: 20, overflowY: "auto", position: "relative" }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 1000,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 20,
            width: 25
          }}
        >
          <span style={{
            display: "block",
            height: 3,
            width: "100%",
            background: "#1f2937",
            borderRadius: 2,
            transform: sidebarOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            transition: "0.3s"
          }}></span>
          <span style={{
            display: "block",
            height: 3,
            width: "100%",
            background: "#1f2937",
            borderRadius: 2,
            opacity: sidebarOpen ? 0 : 1,
            transition: "0.3s"
          }}></span>
          <span style={{
            display: "block",
            height: 3,
            width: "100%",
            background: "#1f2937",
            borderRadius: 2,
            transform: sidebarOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            transition: "0.3s"
          }}></span>
        </button>

        {activePage === "Calendar" && <Calendar events={events} />}

        {activePage === "Dashboard" && (
          <div>
            <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: 28, marginBottom: 30 }}>
              Dashboard
            </h2>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 30 }}>
              <div style={{ flex: "1 1 200px", background: "white", padding: 20, borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                <h3>Upcoming Events</h3>
                <p>{events.length} events scheduled</p>
              </div>
              <div style={{ flex: "1 1 200px", background: "white", padding: 20, borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                <h3>Tasks Completed</h3>
                <p>12 tasks completed this month</p>
              </div>
              <div style={{ flex: "1 1 200px", background: "white", padding: 20, borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                <h3>Notifications</h3>
                <p>5 new notifications</p>
              </div>
            </div>

            <div style={{ background: "white", padding: 20, borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
              <h3>Recent Events</h3>
              <ul style={{ paddingLeft: 20 }}>
                {events.map((ev) => (
                  <li key={ev.title}>{ev.title} on {ev.date} at {ev.time}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activePage === "Settings" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 50 }}>
            <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: 28, marginBottom: 30 }}>
              Settings
            </h2>

            <div style={{ width: "80%", maxWidth: 600, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
              <p>Manage your application settings here:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 15, marginTop: 20 }}>
                <label>
                  <input type="checkbox" /> Enable Notifications
                </label>
                <label>
                  <input type="checkbox" /> Dark Mode
                </label>
                <label>
                  <input type="checkbox" /> Auto-Refresh Calendar
                </label>
                <button style={{ padding: "8px 15px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: 6, cursor: "pointer", width: 150 }}>
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
