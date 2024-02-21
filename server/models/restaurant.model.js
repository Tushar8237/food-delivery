import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        unique : true
    },
    address : {
        street: String,
        city: String,
        state: String,
        zip: String,
        // require : true,
    },
    phoneNumber : {
        type : String,
        require : true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number,
        default: 0
    },
    image : {
        type : String,
        default: "https://th.bing.com/th/id/R.fa0ca630a6a3de8e33e03a009e406acd?rik=UOMXfynJ2FEiVw&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2ff%2fa%2f0%2fc%2f1434020125875430376profile.png&ehk=73x7A%2fh2HgYZLT1q7b6vWMXl86IjYeDhub59EZ8hF14%3d&risl=&pid=ImgRaw&r=0"
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
    ]
}, {timestamps: true})

const Restaurant = mongoose.model('Restaurant', restaurantSchema )

export default Restaurant