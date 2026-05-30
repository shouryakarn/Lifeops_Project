import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getGoals, createGoal, toggleGoal, deleteGoal } from "../services/goalService";
import "../styles/pages.css";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (error) {
      console.error("Error loading goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createGoal({ title });
      setTitle("");
      loadGoals();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleToggleGoal = async (id) => {
    try {
      await toggleGoal(id);
      loadGoals();
    } catch (error) {
      console.error("Error toggling goal:", error);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoal(id);
      loadGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <h1>Goals</h1>
        <p>Define your future and take the first step 🎯</p>
      </div>

      <div className="glass-card page-card">
        <form onSubmit={handleAddGoal} className="add-form">
          <input
            type="text"
            placeholder="What's your next big achievement?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="btn-primary">Set Goal</button>
        </form>

        <div className="list-container">
          {loading ? (
            <p>Loading goals...</p>
          ) : goals.length === 0 ? (
            <p className="empty-msg">No goals set. Aim high!</p>
          ) : (
            goals.map((goal) => (
              <div key={goal._id} className={`list-item ${goal.completed ? "completed" : ""}`}>
                <div className="item-info" onClick={() => handleToggleGoal(goal._id)}>
                  <div className={`checkbox ${goal.completed ? "checked" : ""}`}>
                    {goal.completed && "✓"}
                  </div>
                  <span>{goal.title}</span>
                </div>
                <button className="delete-btn" onClick={() => handleDeleteGoal(goal._id)}>
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Goals;
