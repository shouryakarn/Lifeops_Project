import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Tasks", path: "/tasks", icon: "📝" },
    { name: "Habits", path: "/habits", icon: "🔥" },
    { name: "Expenses", path: "/expenses", icon: "💰" },
    { name: "Goals", path: "/goals", icon: "🎯" },
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <h2 className="logo">LifeOps</h2>
      </div>

      <nav className="sidebar-nav">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-item ${location.pathname === link.path ? "active" : ""}`}
          >
            <span className="nav-icon">{link.icon}</span>
            <span className="nav-name">{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
