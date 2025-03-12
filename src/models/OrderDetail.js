const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema(
    {
        orderID: { type: mongoose.Schema.Types.ObjectId , required: true },
        orderDetailID: { type: String, require: true},
        tableID: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' , required: true },
        tableNumber: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        createdTime: { type: Date, required: true },
        listMeal: [
            {
                name: {type: String, required: true },
                note: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: {type: Number, required: true },
                status: {type: String, required: true },
                mealID: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' , required: true}
            }
        ]
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);