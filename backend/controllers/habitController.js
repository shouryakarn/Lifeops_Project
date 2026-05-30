const Habit = require("../models/Habit");

// GET all habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE habit
exports.createHabit = async (req, res) => {
  try {
    const habit = await Habit.create({
      title: req.body.title,
      user: req.user.id,
    });
    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// TOGGLE habit (Complete / Undo)
exports.toggleHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.completed = !habit.completed;
    await habit.save();

    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    await habit.deleteOne();
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
