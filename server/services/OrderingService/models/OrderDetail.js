const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema(
    {
        orderID: { type: mongoose.Schema.Types.ObjectId , required: true },
        orderDetailsID: { type: String, require: true},
        tableID: { type: mongoose.Schema.Types.ObjectId, ref: 'tables' , required: true },
        tableNumber: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        createdTime: { type: Date, required: true },
        note: { type: String, require: false},
        orderStatus: { type: String, default: 'confirmed' },
        shiftID: { type: String, required: true },
        listMeal: [
            {
                name: {type: String, required: true },
                // note: { type: String, required: false },
                quantity: { type: Number, required: true },
                price: {type: Number, required: true },
                status: {type: String, required: true },
                mealID: { type: mongoose.Schema.Types.ObjectId, ref: 'meals' , required: true},
                image: { type: String, require: true }
            }
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('orderdetails', OrderDetailSchema);