const Table = require('../models/Table');

exports.getFreeTables = async (req, res) => {
    try {
        const freeTables = await Table.find({ status: 'free' });
        res.status(200).json(freeTables);
    } catch (error) {
        console.error('❌ Lỗi khi lấy danh sách bàn free:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};
