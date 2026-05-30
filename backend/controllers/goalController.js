const Goal = require("../models/Goal");

exports.getGoals = async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.json(goals);
};

exports.createGoal = async (req, res) => {
  const goal = await Goal.create({
    title: req.body.title,
    user: req.user.id,
  });
  res.status(201).json(goal);
};

exports.toggleGoal = async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user.id });
  goal.completed = !goal.completed;
  await goal.save();
  res.json(goal);
};

exports.deleteGoal = async (req, res) => {
  await Goal.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: "Deleted" });
};
