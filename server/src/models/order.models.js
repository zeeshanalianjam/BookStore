import mongoose, { model, Schema } from "mongoose";

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    book : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Books"
    },
    status : {
        type: String,
        default:"Order Placed",
        enum: ["Order Placed", "Out for delivery", "Delivered", "Canceled"]
        
    },
},{
    timestamps: true
});

export const Order = model("Order", orderSchema)