import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true },
        orderData: { type: Array, require: true }
    },
    { timestamps: true }
)

const Orders = mongoose.models.Orders || mongoose.model('Orders', orderSchema)

export default Orders