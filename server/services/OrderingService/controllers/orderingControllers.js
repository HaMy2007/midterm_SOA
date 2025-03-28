const Order = require("../models/OrderDetail");
const mongoose = require('mongoose');

exports.getOrders = async (req, res) => {
    console.log("🔍 Nhận request GET /api/orders");
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error("❌ Lỗi truy vấn MongoDB:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
};


exports.getOrderDetails = async (req, res) => {
    try {
        const { order_id } = req.params;
        const objectId = new mongoose.Types.ObjectId(order_id);
        const order = await Order.findOne({ orderID: objectId });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({
            order_id: order._id,
            orderID: order.orderID,
            orderDetailsID: order.orderDetailsID,
            table_id: order.tableID,
            table_number: order.tableNumber,
            total_price: order.totalPrice,
            created_time: order.createdTime,
            order_status: order.orderStatus,
            listMeal: order.listMeal
        });
    } catch (error) {
        console.error('Error in getOrderDetails:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateMealStatus = async (req, res) => {
    const { orderId, mealId } = req.params;
    const { status } = req.body;

    try {
        const objectOrderId = new mongoose.Types.ObjectId(orderId);
        const objectMealId = new mongoose.Types.ObjectId(mealId);

        const order = await Order.findById(objectOrderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const meal = order.listMeal.find(m => m.mealID.equals(objectMealId));
        if (!meal) {
            return res.status(404).json({ error: 'Meal not found in order' });
        }

        meal.status = status;

        const allCompleted = order.listMeal.every(m => m.status === 'completed');
        if (allCompleted && order.orderStatus !== 'completed') {
            order.orderStatus = 'completed';
        }

        await order.save();

        res.status(200).json({
            message: 'Cập nhật trạng thái món thành công',
            orderStatus: order.orderStatus,
            updatedMeal: meal
        });

    } catch (error) {
        console.error('❌ Lỗi khi cập nhật trạng thái món:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getOrderHistory = async (req, res) => {
    try {
      const { start_date, end_date } = req.query;
  
      if (!start_date) {
        return res.status(400).json({ error: "start_date is required" });
      }
  
      const startDate = new Date(start_date);
      const endDate = end_date ? new Date(end_date) : new Date();
  
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
  
      const filter = {
        createdTime: { $gte: startDate, $lte: endDate },
        orderStatus: 'completed'
      };
  
      const orders = await Order.find(filter)
        .select("_id tableID totalPrice orderStatus createdTime")
        .lean();
  
      const orderHistory = orders.map(order => ({
        order_id: order._id,
        table_id: order.tableID,
        total_price: order.totalPrice,
        status: order.orderStatus,
        timestamp: order.createdTime
      }));
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  
      res.status(200).json({ 
        orders: orderHistory, 
        totalRevenue, 
        totalOrders: orders.length
    });
  
    } catch (error) {
      console.error("Error in getOrderHistory:", error);
      res.status(500).json({ error: "Server error" });
    }
};
  
exports.getRevenue = async (req, res) => {
    try {
      const { start_date, end_date, shift_id } = req.query;
  
      if (!start_date) {
        return res.status(400).json({ error: "start_date is required" });
      }
  
      const startDate = new Date(start_date);
      let endDate;
  
      if (end_date) {
        endDate = new Date(end_date);
      } else {
        endDate = new Date(start_date); 
      }
  
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
  
      const filter = {
        createdTime: { $gte: startDate, $lte: endDate },
        orderStatus: 'completed'
      };
  
      if (shift_id) {
        filter.shiftID = shift_id;
      }
  
      const orders = await Order.find(filter).lean();
  
      const total_orders = orders.length;
      const total_revenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  
      res.status(200).json({
        total_orders,
        total_revenue,
        detail_orders: orders
      });
    } catch (error) {
      console.error('Error in getRevenue:', error);
      res.status(500).json({ error: 'Server error' });
    }
};
  
  