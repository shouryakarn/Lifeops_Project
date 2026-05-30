const express = require("express");
const router = express.Router();

// import controller
const { testPost } = require("../controllers/testController");

// use controller
router.post("/test", testPost);

module.exports = router;
