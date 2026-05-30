import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import "../styles/pages.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTask({ title });
      setTitle("");
      loadTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleTask = async (id, completed) => {
    try {
      await updateTask(id, { completed: !completed });
      loadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <h1>Tasks</h1>
        <p>Keep track of your to-dos 📝</p>
      </div>

      <div className="glass-card page-card">
        <form onSubmit={handleAddTask} className="add-form">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="btn-primary">Add Task</button>
        </form>

        <div className="list-container">
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="empty-msg">No tasks yet. Start by adding one!</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className={`list-item ${task.completed ? "completed" : ""}`}>
                <div className="item-info" onClick={() => handleToggleTask(task._id, task.completed)}>
                  <div className={`checkbox ${task.completed ? "checked" : ""}`}>
                    {task.completed && "✓"}
                  </div>
                  <span>{task.title}</span>
                </div>
                <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>
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

export default Tasks;
