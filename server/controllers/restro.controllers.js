import Restaurant from "../models/restaurant.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// // create restaurant
// export const createRestaurants = async (req, res, next) => {
//     try {
//         const {name, address, categories, phoneNumber, openTime, closeTime, approxTwo, rating } = req.body;
//         const owner = req.user.id;
//         const slug = req.body.name
//         .split(' ')
//         .join('-')
//         .toLowerCase()
//         .replace(/[^a-zA-Z0-9-]/g, '')

//         // Upload image to cloudinary
//         const imageUploadResult = await cloudinary.uploader.upload(req.file.path, {
//             folder: 'food-delivery'
//         })

//         // create new restaurant
//         const newRestaurant = new Restaurant({
//             name,
//             address,
//             categories,
//             phoneNumber,
//             owner,
//             openTime,
//             closeTime,
//             approxTwo,
//             slug,
//             rating,
//             image: imageUploadResult.secure_url
//         })
//         const restaurant = await newRestaurant.save()
//         const user = await User.findById(req.user.id)
//         user.restaurant.push(restaurant._id)
//         await user.save();
//         res.status(201).json({
//             success: true,
//             message: "Restaurant created successfully",
//             restaurant,
//         })
//     } catch (error) {
//         next(error)
//     }
// }

// create restaurant
export const createRestaurants = async (req, res, next) => {
    try {
        const {
            name,
            street,
            city,
            state,
            zip,
            categories,
            phoneNumber,
            openTime,
            closeTime,
            approxTwo,
            rating,
        } = req.body;
        const owner = req.user.id;
        const slug = req.body.name
            .split(" ")
            .join("-")
            .toLowerCase()
            .replace(/[^a-zA-Z0-9-]/g, "");
        const file = req.files.image;

        if (file) {
            const uploadResponse = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    folder: "food-delivery",
                    resource_type: "image",
                }
            );
            if (uploadResponse) {
                const newRestaurant = new Restaurant({
                    name,
                    street,
                    city,
                    state,
                    zip,
                    categories,
                    phoneNumber,
                    owner,
                    openTime,
                    closeTime,
                    approxTwo,
                    slug,
                    rating,
                    image: uploadResponse.secure_url,
                });
                const restaurant = await newRestaurant.save();
                const user = await User.findById(req.user.id);
                user.restaurant.push(restaurant._id);
                await user.save();
                res.status(201).json({
                    success: true,
                    message: "Restaurant created successfully",
                    restaurant,
                });
            }
        }
    } catch (error) {
        next(error);
    }
};

// get all restaurants
export const getRestaurants = async (req, res, next) => {
    try {
        const restros = await Restaurant.find().populate("menu");
        return res.status(200).json({
            success: true,
            restros,
        });
    } catch (error) {
        next(error);
    }
};

// get my restaurant
export const getMyRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate(
            "menu"
        );

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }
        res.status(201).json({
            success: true,
            message: "Restaurant created successfully",
            restaurant,
        });
    } catch (error) {
        next(error);
    }
};
