import axios from "axios";

const API_URL = "http://localhost:5000/api";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const fetchDashboardData = async () => {
  const [habitsRes, expensesRes, goalsRes, tasksRes] = await Promise.all([
    axios.get(`${API_URL}/habits`, authConfig()),
    axios.get(`${API_URL}/expenses`, authConfig()),
    axios.get(`${API_URL}/goals`, authConfig()),
    axios.get(`${API_URL}/tasks`, authConfig()),
  ]);

  const habits = habitsRes.data;
  const expenses = expensesRes.data;
  const goals = goalsRes.data;
  const tasks = tasksRes.data;

  return {
    summary: {
      totalHabits: habits.length,
      completedHabits: habits.filter((h) => h.completed).length,
      totalExpenses: expenses.reduce((s, e) => s + e.amount, 0),
      totalGoals: goals.length,
      activeTasks: tasks.filter((t) => !t.completed).length,
    },
    habits,
    expenses,
    tasks,
  };
};
