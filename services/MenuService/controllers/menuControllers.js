const Meal = require("../models/Meal");

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
