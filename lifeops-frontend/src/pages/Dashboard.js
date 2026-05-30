import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import ExpenseChart from "../components/charts/ExpenseChart";
import HabitChart from "../components/charts/HabitChart";
import LoadingSkeleton from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";
import { fetchDashboardData } from "../services/dashboardService";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetchDashboardData();
        setData(res);
      } catch (error) {
        console.error("Dashboard load error:", error);
      }
    };

    loadDashboard();
  }, []);

  if (!data) {
    return (
      <Layout>
        <LoadingSkeleton />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Your life at a glance ⚡</p>
      </div>

      <div className="dashboard-grid">
        <DashboardCard
          title="Active Tasks"
          value={data.summary.activeTasks}
          icon="📝"
        />
        <DashboardCard
          title="Habit Streak"
          value={`${data.summary.completedHabits}/${data.summary.totalHabits}`}
          icon="🔥"
        />
        <DashboardCard
          title="Total Expenses"
          value={`₹${data.summary.totalExpenses.toLocaleString()}`}
          icon="💰"
        />
        <DashboardCard
          title="Active Goals"
          value={data.summary.totalGoals}
          icon="🎯"
        />
      </div>

      <div className="chart-grid">
        <div className="chart-box glass-card">
          <h3>Expense Distribution</h3>
          {data.expenses.length === 0 ? (
            <EmptyState message="No expense data" />
          ) : (
            <ExpenseChart expenses={data.expenses} />
          )}
        </div>

        <div className="chart-box glass-card">
          <h3>Habit Consistency</h3>
          {data.habits.length === 0 ? (
            <EmptyState message="No habit data" />
          ) : (
            <HabitChart habits={data.habits} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
