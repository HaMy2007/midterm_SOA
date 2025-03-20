const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; 

require('./src/config/db');
app.use(express.json());

const { 
  createOrder, 
  addItem, 
  getOrderDetails, 
  cancelItem, 
  confirmItem, 
  getPendingOrders,
  completeOrder,
  getRevenue,
  getOrderHistory
} = require("./src/util/function");

// API 1: Tạo đơn hàng
app.post("/api/orders/create", createOrder);

// API 2: Thêm món
app.post("/api/orders/add-item", addItem);

// API 3: Xem chi tiết đơn hàng
app.get("/api/orders/:order_id", getOrderDetails);

// API 4: Huỷ món
app.delete("/api/orders/:order_id/item/:item_id", cancelItem);

// API 5: Xác nhận món đã hoàn thành
app.post("/api/kitchen/confirm-item", confirmItem);

// API 6: Xem danh sách đơn hàng đang chờ chế biến
app.get("/api/kitchen/orders", getPendingOrders);

// API 7: Hoàn tất đơn hàng
app.post("/api/orders/complete", completeOrder);

// API 8: Xem tổng hợp doanh thu
app.get("/api/manager/revenue", getRevenue);

// API 9: Xem lịch sử hóa đơn
app.get("/api/manager/orders/history", getOrderHistory);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
