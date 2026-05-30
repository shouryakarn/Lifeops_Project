import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Expenses from "./pages/Expenses";
import Goals from "./pages/Goals";
import Tasks from "./pages/Tasks";

const App = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token && token !== "undefined" && token !== "null";

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks"
          element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />}
        />
        <Route
          path="/habits"
          element={isAuthenticated ? <Habits /> : <Navigate to="/login" />}
        />
        <Route
          path="/expenses"
          element={isAuthenticated ? <Expenses /> : <Navigate to="/login" />}
        />
        <Route
          path="/goals"
          element={isAuthenticated ? <Goals /> : <Navigate to="/login" />}
        />

        {/* Default Route */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
