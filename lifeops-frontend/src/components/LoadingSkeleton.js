import React from "react";
import "../styles/skeleton.css";

const LoadingSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
    </div>
  );
};

export default LoadingSkeleton;
