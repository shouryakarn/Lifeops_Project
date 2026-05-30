import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const HabitChart = ({ habits }) => {
  const completed = habits.filter(h => h.completed).length;
  const pending = habits.length - completed;

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ["#6366f1", "rgba(255, 255, 255, 0.05)"],
        borderColor: ["#6366f1", "rgba(255, 255, 255, 0.1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#94a3b8",
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default HabitChart;
