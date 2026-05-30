const express = require("express");
const router = express.Router();
const {
  getHabits,
  createHabit,
  toggleHabit,
  deleteHabit,
} = require("../controllers/habitController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getHabits);
router.post("/", authMiddleware, createHabit);
router.patch("/:id", authMiddleware, toggleHabit);   // 👈 toggle / undo
router.delete("/:id", authMiddleware, deleteHabit);

module.exports = router;
