const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuControllers");

router.put("/meals/:id/lock", menuController.toggleMealLock);
// Định nghĩa route cho GET /meals
router.get("/meals", menuController.getMeals);

module.exports = router;
