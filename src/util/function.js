const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { table_id, order_items } = req.body;
    
    // Tính tổng tiền (ví dụ mặc định là 0, bạn có thể thay đổi)
    const totalPrice = 0;

    // Tạo mới đơn hàng
    const newOrder = new Order({
      orderStatus: 'pending',
      totalPrice,
      table: table_id,
      // Nếu có thông tin nhân viên phục vụ, thêm employee: ...
      order_items: order_items || [] // Nếu đơn hàng được tạo kèm các món, có thể đặt sẵn
    });

    const savedOrder = await newOrder.save();

    // Trả về thông tin đơn hàng
    res.status(201).json({
      order_id: savedOrder._id,
      status: savedOrder.orderStatus,
      created_at: savedOrder.createdTime,
    });
  } catch (error) {
    console.error('Error in createOrder:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { order_id, menu_item_id, quantity, note } = req.body;

    // Tìm đơn hàng theo order_id
    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Thêm món vào mảng order_items
    order.order_items.push({ menu_item_id, quantity, note });

    // cập nhật lại tổng tiền (totalPrice) tại đây dựa vào thông tin của món ăn.
    // Ví dụ: order.totalPrice += quantity * menuItemPrice;

    const updatedOrder = await order.save();

    res.status(200).json({
      message: 'Item added successfully',
      updated_order: updatedOrder,
    });
  } catch (error) {
    console.error('Error in addItem:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
// Hàm xem chi tiết đơn hàng (API 3)
exports.getOrderDetails = async (req, res) => {
  try {
    // Lấy order_id từ URL params
    const { order_id } = req.params;
    
    // Tìm đơn hàng theo order_id
    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Trả về thông tin chi tiết của đơn hàng
    res.status(200).json({
      order_id: order._id,
      table_id: order.table,
      order_items: order.order_items,
      total_price: order.totalPrice,
      status: order.orderStatus,
    });
  } catch (error) {
    console.error('Error in getOrderDetails:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
// Hàm huỷ món đã đặt (API 4)
exports.cancelItem = async (req, res) => {
  try {
    const { order_id, item_id } = req.params;

    // Tìm đơn hàng theo order_id
    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Ghi nhận số lượng phần tử trước khi loại bỏ
    const initialLength = order.order_items.length;
    
    // Sử dụng pull để loại bỏ phần tử có _id tương ứng
    order.order_items.pull(item_id);

    // Nếu số lượng không thay đổi, có nghĩa phần tử không tồn tại
    if (order.order_items.length === initialLength) {
      return res.status(404).json({ error: 'Item not found in order' });
    }

    // Lưu lại đơn hàng sau khi cập nhật
    const updatedOrder = await order.save();

    res.status(200).json({
      message: 'Item canceled successfully',
      updated_order: updatedOrder,
    });
  } catch (error) {
    console.error('Error in cancelItem:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
// API 5
exports.confirmItem = async (req, res) => {
  try {
    const { order_id, menu_item_id } = req.body;
    
    // Tìm đơn hàng theo order_id
    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Cập nhật trạng thái cho tất cả các order_items có menu_item_id khớp
    let updated = false;
    order.order_items.forEach(item => {
      // So sánh bằng cách chuyển ObjectId sang chuỗi
      if (item.menu_item_id.toString() === menu_item_id && !item.confirmed) {
        item.confirmed = true;
        updated = true;
      }
    });
    
    if (!updated) {
      return res.status(404).json({ error: 'Item not found or already confirmed' });
    }
    
    const updatedOrder = await order.save();
    
    res.status(200).json({
      message: 'Xác nhận món đã sẵn sàng để phục vụ',
      updated_order: updatedOrder
    });
  } catch (error) {
    console.error('Error in confirmItem:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
// API6 
// Hàm lấy danh sách đơn hàng đang chờ chế biến (trạng thái "pending")
exports.getPendingOrders = async (req, res) => {
  try {
    // Lấy các đơn hàng có trạng thái "pending"
    const pendingOrders = await Order.find({ orderStatus: "pending" })
      .select("_id table order_items")
      .lean();

    // Định dạng kết quả: trả về order_id, table_id và items (order_items)
    const formattedOrders = pendingOrders.map(order => ({
      order_id: order._id,
      table_id: order.table,
      items: order.order_items
    }));

    res.status(200).json({ pending_orders: formattedOrders });
  } catch (error) {
    console.error("Error in getPendingOrders:", error);
    res.status(500).json({ error: "Server error" });
  }
};