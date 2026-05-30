const express = require("express");
const router = express.Router();

const {
  getExpenses,
  createExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const authMiddleware = require("../middleware/authMiddleware");

// GET all expenses
router.get("/", authMiddleware, getExpenses);

// CREATE expense
router.post("/", authMiddleware, createExpense);

// DELETE expense
router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;
