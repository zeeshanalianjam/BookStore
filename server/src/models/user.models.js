import mongoose, { model, Schema } from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    favourites: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
    }
],
    cart: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
    }
],
    orders: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    }
],
},{
    timestamps: true
})

export const User = model("User", userSchema)