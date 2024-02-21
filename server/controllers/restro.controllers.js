import Restaurant from '../models/restaurant.model.js';
import User from '../models/user.model.js';

// create restaurant
export const createRestaurants = async (req, res, next) => {
    try {
        const {name, address, phoneNumber} = req.body;
        const owner = req.user.id;
        const newRestaurant = new Restaurant({name, address, phoneNumber, owner})
        const restaurant = await newRestaurant.save()
        const user = await User.findById(req.user.id)
        user.restaurant.push(restaurant._id)
        await user.save();
        res.status(201).json({
            success: true,
            message: "Restaurant created successfully",
            restaurant,
        })
    } catch (error) {
        next(error)
    }
}
