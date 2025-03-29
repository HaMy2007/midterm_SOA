const Meal = require("../models/Meal");
const mongoose = require('mongoose');

// Lấy danh sách món ăn
exports.getMeals = async (req, res) => {
    console.log("🔍 Nhận request GET /api/meals");
    try {
        const meals = await Meal.find();
        res.json(meals);
    } catch (error) {
        console.error("❌ Lỗi truy vấn MongoDB:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
};

exports.toggleMealLock = async (req, res) => {
  const { id } = req.params;
  const { isLocked } = req.body;
  console.log("📦 isLocked nhận được từ client:", isLocked); 
  try {
    const meal = await Meal.findByIdAndUpdate(id, { isLocked }, { new: true });
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.json({ message: "Cập nhật trạng thái khóa thành công", meal });
  } catch (err) {
    console.error("❌ Lỗi khi khóa/unlock món:", err);
    res.status(500).json({ error: "Server error" });
  }
};
