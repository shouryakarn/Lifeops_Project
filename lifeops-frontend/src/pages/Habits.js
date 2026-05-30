import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getHabits, createHabit, toggleHabit, deleteHabit } from "../services/habitService";
import "../styles/pages.css";

const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (error) {
      console.error("Error loading habits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createHabit({ title });
      setTitle("");
      loadHabits();
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  const handleToggleHabit = async (id) => {
    try {
      await toggleHabit(id);
      loadHabits();
    } catch (error) {
      console.error("Error toggling habit:", error);
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await deleteHabit(id);
      loadHabits();
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <h1>Habits</h1>
        <p>Track your daily routine and build consistency 🔥</p>
      </div>

      <div className="glass-card page-card">
        <form onSubmit={handleAddHabit} className="add-form">
          <input
            type="text"
            placeholder="New habit (e.g., Morning Run)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="btn-primary">Add Habit</button>
        </form>

        <div className="list-container">
          {loading ? (
            <p>Loading habits...</p>
          ) : habits.length === 0 ? (
            <p className="empty-msg">No habits tracked yet. Discipline starts here!</p>
          ) : (
            habits.map((habit) => (
              <div key={habit._id} className={`list-item ${habit.completed ? "completed" : ""}`}>
                <div className="item-info" onClick={() => handleToggleHabit(habit._id)}>
                  <div className={`checkbox ${habit.completed ? "checked" : ""}`}>
                    {habit.completed && "✓"}
                  </div>
                  <span>{habit.title}</span>
                </div>
                <button className="delete-btn" onClick={() => handleDeleteHabit(habit._id)}>
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

export default Habits;
