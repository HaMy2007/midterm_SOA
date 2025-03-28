const express = require("express");
const router = express.Router();
const orderingController = require("../controllers/orderingControllers");

router.get("/orders", orderingController.getOrders);
router.get("/orders/:order_id", orderingController.getOrderDetails);
router.put('/orders/:orderId/meals/:mealId/status', orderingController.updateMealStatus);
router.get('/bills', orderingController.getOrderHistory);
router.get('/revenue', orderingController.getRevenue);

module.exports = router;
