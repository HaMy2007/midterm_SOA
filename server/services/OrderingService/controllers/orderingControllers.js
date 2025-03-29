const Order = require("../models/OrderDetail");
const mongoose = require('mongoose');
const Table = require("../../WelcomeService/models/Table");
const axios = require("axios");

exports.getOrders = async (req, res) => {
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
        const { id } = req.params;
        const objectId = new mongoose.Types.ObjectId(id);
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
            note: order.note,
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

        const order = await Order.findOne({ orderID: objectOrderId });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const meal = order.listMeal.find(m => m.mealID.equals(objectMealId));
        if (!meal) {
            return res.status(404).json({ error: 'Meal not found in order' });
        }

        meal.status = status;
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

exports.createOrder = async (req, res) => {
  try {
    console.log("🔥 Data nhận được:", req.body);
    const {
      tableNumber,
      tableID,
      shiftID,
      listMeal,
      totalPrice,
      note
    } = req.body;
    const objectTableId = new mongoose.Types.ObjectId(tableID);

    const existingOrder = await Order.findOne({
      tableID: objectTableId,
      orderStatus: { $ne: "completed" }
    });

    console.log("🔍 tableID:", objectTableId);
    console.log("🔍 Tìm đơn hàng chưa hoàn thành...");


    if (existingOrder) {
      // Thêm món vào đơn cũ
      existingOrder.listMeal.push(
        ...listMeal.map(item => ({
          ...item,
          status: item.status || "confirmed"
        }))
      );
      existingOrder.totalPrice += totalPrice;
      await existingOrder.save();

      console.log("📄 existingOrder:", existingOrder);

      return res.status(200).json({
        message: "Đã thêm món vào order đang chờ",
        order: existingOrder
      });
    }

    const neworder = await Order.create({
      orderID: new mongoose.Types.ObjectId(), // hoặc để Mongoose tự tạo _id rồi gán cho orderID nếu bạn muốn
      orderDetailsID: new mongoose.Types.ObjectId().toString(),
      tableID: objectTableId,
      tableNumber,
      note,
      totalPrice,
      createdTime: new Date(),
      orderStatus: "confirmed", // trạng thái mặc định
      shiftID,
      listMeal: listMeal.map(item => ({
        ...item,
        status: item.status || "confirmed", // mặc định nếu chưa có
      })),
    });

    try {
      const updateTableRes = await axios.put(
        `http://localhost:3002/api/${tableID}/status`, // ĐÚNG endpoint bạn đã định nghĩa
        { status: "full" }
      );
      console.log("✅ Đã cập nhật trạng thái bàn:", updateTableRes.data);
    } catch (err) {
      console.error("❌ Không thể cập nhật trạng thái bàn:", err.message);
    }

    res.status(201).json({ message: "Order created successfully", neworder });
  } catch (error) {
    console.error("❌ Lỗi khi tạo đơn hàng:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateOrderById = async (req, res) => {
  const { id } = req.params;
  const { listMeal, totalPrice } = req.body;

  try {
    const objectOrderId = new mongoose.Types.ObjectId(id);

    const order = await Order.findOne({ orderID: objectOrderId });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Gộp listMeal mới vào listMeal cũ
    // order.listMeal = [...order.listMeal, ...listMeal];
    // order.totalPrice += totalPrice;
    // const updatedListMeal = [...order.listMeal];
    listMeal.forEach((newMeal) => {
      const existingIndex = order.listMeal.findIndex(
        (item) => String(item.mealID?.toString()) === String(newMeal.mealID)
      );

      if (existingIndex !== -1) {
        // Cộng dồn số lượng
        order.listMeal[existingIndex].quantity += newMeal.quantity;
      } else {
        // Món mới, thêm vào
        order.listMeal.push(newMeal);
      }
    });

    // order.listMeal = updatedListMeal;
    order.totalPrice += totalPrice;
    order.markModified("listMeal");
    await order.save();

    res.status(200).json({
      message: "Cập nhật đơn hàng thành công",
      order,
    });
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật đơn hàng:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};


// exports.updateOrderStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   try {
//     const objectOrderId = new mongoose.Types.ObjectId(id);

//     const order = await Order.findOne({ orderID: objectOrderId });

//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     order.orderStatus = status;
//     await order.save();

//     if (status === "completed") {
//       await Table.findByIdAndUpdate(order.tableID, { status: "free" });
//     }

//     res.status(200).json({
//       message: 'Cập nhật trạng thái đơn hàng thành công',
//       orderStatus: order.orderStatus,
//     });

//   } catch (error) {
//     console.error('❌ Lỗi khi cập nhật trạng thái đơn hàng:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const objectOrderId = new mongoose.Types.ObjectId(id);

    const order = await Order.findOne({ orderID: objectOrderId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.orderStatus = status;
    await order.save();

    if (status === "completed" && order.tableID) {
      try {
        const apiRes = await axios.put(
          `http://localhost:3002/api/${order.tableID}/status`,
          { status: "free" }
        );

        console.log("✅ Cập nhật status bàn thành công:", apiRes.data);
      } catch (err) {
        console.error("❌ Lỗi khi gọi API cập nhật bàn:", err.message);
      }
    }

    res.status(200).json({
      message: 'Cập nhật trạng thái đơn hàng thành công',
      tableID: order.tableID,
      orderStatus: order.orderStatus,
    });

  } catch (error) {
    console.error('❌ Lỗi khi cập nhật trạng thái đơn hàng:', error);
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
  
  