// const express = require("express");
// const router = express.Router();
// const Meal = require("../models/Meal");  // Model MongoDB

// // API GET danh sách món ăn
// router.get("/meals", async (req, res) => {
//     console.log("🔍 Nhận request GET /api/meals");
//     try {
//         const meals = await Meal.find();
//         // console.log("✅ Trả về dữ liệu:", meals);
//         res.json(meals);
//     } catch (error) {
//         console.error("❌ Lỗi truy vấn MongoDB:", error);
//         res.status(500).json({ message: "Lỗi server", error });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuControllers");

// Định nghĩa route cho GET /meals
router.get("/meals", menuController.getMeals);

module.exports = router;
