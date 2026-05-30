const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");
const taskRoutes = require("./routes/taskRoutes");
const testRoutes = require("./routes/testRoutes");
const goalRoutes = require("./routes/goalRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

// ================= API ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/test", testRoutes);
app.use("/api/expenses", expenseRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("LifeOps Backend is running 🚀");
});

// ================= DB CONNECTION =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
