const Table = require('../models/Table');
const axios = require("axios");

// exports.getFreeTables = async (req, res) => {
//     try {
//         const freeTables = await Table.find({ status: 'free' });
//         res.status(200).json(freeTables);
//     } catch (error) {
//         console.error('❌ Lỗi khi lấy danh sách bàn free:', error);
//         res.status(500).json({ error: 'Lỗi server' });
//     }
// };
exports.getFreeTables = async (req, res) => {
  try {
    // Gọi đến OrderingService để lấy danh sách tableID đang được sử dụng
    const orderRes = await axios.get("http://localhost:3001/api/active-table-ids"); // sửa lại URL đúng của OrderingService
    const activeTableIds = orderRes.data.tableIds;

    const tables = await Table.find({
      $or: [
        { status: "free" },
        { _id: { $in: activeTableIds } }
      ]
    });

    res.status(200).json(tables);
  } catch (error) {
    console.error("❌ Lỗi khi gọi sang OrderingService hoặc truy vấn Table:", error.message);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.updateTableStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const table = await Table.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }
  
      res.json({ message: "Cập nhật trạng thái bàn thành công", table });
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật bàn:", error);
      res.status(500).json({ error: "Server error" });
    }
  };