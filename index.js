const express = require("express");
const db = require('./src/config/db');
const app = express();
const PORT = process.env.PORT || 3000; 

require('./src/config/db');
app.use(express.json());
const { createOrder, addItem, getOrderDetails, cancelItem, confirmItem, getPendingOrders} = require("./src/util/function");

// Đăng ký route API: Tạo đơn hàng mới
app.post("/api/orders/create", createOrder);

// Đăng ký route API: Thêm món vào đơn hàng
app.post("/api/orders/add-item", addItem);

// Đăng ký route API: Xem chi tiết đơn hàng
app.get("/api/orders/:order_id", getOrderDetails);

// Đăng ký route API: Huỷ món đã đặt
app.delete("/api/orders/:order_id/item/:item_id", cancelItem);

// Route API 5
app.post("/api/kitchen/confirm-item", confirmItem); 

// Route API 6
app.get("/api/kitchen/orders", getPendingOrders);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
