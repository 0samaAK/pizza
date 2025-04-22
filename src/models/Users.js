import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        location: { type: Object, require: true },
        isAdmin:{ type: Boolean, default: false },
        date: { type: Date, default: Date.now }
    },
    { timestamps: true }
)

const Users = mongoose.models.Users || mongoose.model('Users', userSchema)

export default Users