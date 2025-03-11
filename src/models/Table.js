const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema(
    {
        tableNumber: { type: Number, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Table', TableSchema);