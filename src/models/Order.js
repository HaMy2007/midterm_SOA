const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        orderStatus: { type: String, require: true},
        totalPrice: { type: Number, required: true },
        createdTime: { type: Date, default: Date.now },
        table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
        employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Order', OrderSchema);