const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuControllers");

// Định nghĩa route cho GET /meals
router.get("/meals", menuController.getMeals);

module.exports = router;
