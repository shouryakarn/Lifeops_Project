import React from "react";

const EmptyState = ({ message }) => {
  return (
    <div className="empty-state" style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
      <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📊</div>
      <h4 style={{ color: "var(--text-main)", marginBottom: "8px" }}>{message}</h4>
      <p style={{ fontSize: "0.9rem" }}>Start adding data to see insights here</p>
    </div>
  );
};

export default EmptyState;
