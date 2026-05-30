const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/goalController");

router.get("/", auth, controller.getGoals);
router.post("/", auth, controller.createGoal);
router.put("/:id", auth, controller.toggleGoal);
router.delete("/:id", auth, controller.deleteGoal);

module.exports = router;
