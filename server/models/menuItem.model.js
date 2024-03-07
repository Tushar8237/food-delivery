import mongoose from "mongoose";

const foodType= ["Veg", 'Non Veg']
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    price : {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image : {
        type : String,
        default: "https://b.zmtcdn.com/data/dish_photos/50c/450a04cb0408ab8120fcfdd12a32750c.jpeg?fit=around|130:130&crop=130:130;*,*"
    },
    foodType: {
        type: String,
        enum: foodType,
        required: true
    },
    restaurantId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }

},{timestamps: true})

const MenuItem = mongoose.model('Menu', menuItemSchema)

export default MenuItem