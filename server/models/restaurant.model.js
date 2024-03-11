import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        unique : true
    },
    // address : {
    //     street: String,
    //     city: String,
    //     state: String,
    //     zip: String,
    // },
    street: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    zip: {
        type: String,
        require: true
    },
    categories: {
        type: [String],
        required: true
      },
    phoneNumber : {
        type : String,
        require : true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    approxTwo : {
        type: Number,
        require : true
    },
    rating: {
        type: Number,
        default: 0
    },
    image : {
        type : String,
        default: "https://b.zmtcdn.com/data/pictures/chains/4/19564214/4794803104732db8a06cc1eda6e68ee7.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*"
    },
    reviews: [{
        title: String,
        body: String,
        rating: Number,
        author: {
            type: String,
            default: 'Anonymous'
        }
    }],
    menu: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Menu"
        }
    ],
    openTime: {
        type: String,
        require: true
    },
    closeTime: {
        type: String,
        require: true
    },
    orders: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
}, {timestamps: true})

const Restaurant = mongoose.model('Restaurant', restaurantSchema )

export default Restaurant