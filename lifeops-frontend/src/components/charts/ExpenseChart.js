import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ExpenseChart = ({ expenses }) => {
  const monthlyTotals = {};

  expenses.forEach(exp => {
    const month = new Date(exp.date).toLocaleString("default", {
      month: "short",
    });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + exp.amount;
  });

  const data = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Expenses (₹)",
        data: Object.values(monthlyTotals),
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "#6366f1",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#fff",
        bodyColor: "#94a3b8",
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#94a3b8",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ExpenseChart;
