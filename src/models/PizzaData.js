import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        name:{ type: String, require: true},
        category:{ type: String, require: true},
        foodType:{ type: String, require: true},
        price:{ type: Object, require: true},
        description:{ type: String, require: true},
        img:{ type: String, require: true},
    },
    { timestamps: true }
)

const pizzaData = mongoose.models.pizzaData || mongoose.model('pizzaData', dataSchema)

export default pizzaData