const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema(
    {
        note: { type: String },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        orderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
        mealID: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);