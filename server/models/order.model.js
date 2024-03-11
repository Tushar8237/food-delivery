import mongoose from "mongoose";

// schema for cart items
const cartItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
})

// schema for address
const addressSchema = new mongoose.Schema({
    flatNo: String,
    street: String,
    city: String,
    number: Number,
    type: String
})

// Define schema for orders
const orderSchema = new mongoose.Schema({
    username: {
        type: String
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    address: addressSchema,
    cartItems: [cartItemSchema],
}, {timestamps: true});

// Define model for orders
const Order = mongoose.model('Order', orderSchema);

export default Order

