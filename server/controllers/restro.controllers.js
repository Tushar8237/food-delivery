import Restaurant from '../models/restaurant.model.js';
import User from '../models/user.model.js';

// create restaurant
export const createRestaurants = async (req, res, next) => {
    try {
        const {name, address, categories, phoneNumber, openTime, closeTime, approxTwo, rating } = req.body;
        const owner = req.user.id;
        const slug = req.body.name
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '')
        const newRestaurant = new Restaurant({name, address, categories, phoneNumber, owner, openTime, closeTime, approxTwo, slug, rating})
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

// get all restaurants
export const getRestaurants = async (req, res, next) => {
    try {
        const restros = await Restaurant.find().populate('menu')
        return res.status(200).json({
            success: true,
            restros
        })
    } catch (error) {
        next(error)
    }
}

// get my restaurant
export const getMyRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate("menu");

        if (!restaurant) {
            return res.status(404).json({
              success: false,
              message: "Restaurant not found",
            });
        }
        res.status(201).json({
            success: true,
            message: "Restaurant created successfully",
            restaurant
        })
    } catch (error) {
        next(error)
    }
}
