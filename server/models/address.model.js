import mongoose from "mongoose";

// define enum for address types
const addressType= ["Work", 'Home', 'Other']
const addressSchema = new mongoose.Schema({
    flatNo: {
        type: String,
        require: true
    },
    street: {
        type: String,
    },
    city: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        enum: addressType,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    }
})

addressSchema.index({ location: '2dsphere'});

const Address = mongoose.model('Address', addressSchema);
export default Address