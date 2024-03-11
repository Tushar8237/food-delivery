// update user
import { errorHandler } from './../utils/error.js';
import User from './../models/user.model.js';
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, 'You can update only your profile'));
        }
        res.status(200).json({
            success : true,
            user
        });
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, 'You can update only your profile'));
        }

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // Check if an image file is included in the request
        if (req.files && req.files.image) {
            const file = req.files.image;
            const uploadedResponse = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "food-delivery",
                resource_type: "image"
            });
            if (uploadedResponse) {
                // to update the user's profile picture
                req.body.profilePicture = uploadedResponse.secure_url;
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
        
    } catch (error) {
        next(error);
    }
}

// delete user account
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can delete only your account!"));
    }
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been delete...");
    } catch (error) {
      next(error);
    }
};
