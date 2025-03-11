const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        ingredients: [
            {
                ingredientID: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
                quantity: { type: Number, required: true },
                name: { type: String, required: true },
            }
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Meal', MealSchema);