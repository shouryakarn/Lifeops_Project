const Expense = require("../models/Expense");

// GET all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE expense
exports.createExpense = async (req, res) => {
  try {
    const { description, amount, date } = req.body;

    if (!description || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = await Expense.create({
      description,
      amount,
      date: new Date(date),
      user: req.user.id,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
