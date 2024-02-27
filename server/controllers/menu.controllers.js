import MenuItem from "../models/menuItem.model.js";
import Restaurant from "../models/restaurant.model.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


// search Items or restaurant
export const searchItems = async (req, res, next) => {
  try {
    const query = req.query.q;
    const regex = RegExp(query, "i");
    const item = await MenuItem.find({ name: regex }).limit(10);

    if (!item || item.length === 0) {
      res.status(404).json({
        success: false,
        message: "No items were Found",
      });
    }
    // If items are found, respond with the list of items
    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    next(error);
  }
};


// add menu item 
export const addMenuItems = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);
    const file = req.files.image
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }
    if (file) {
      const uploadedResponse = await cloudinary.uploader
        .upload(file.tempFilePath, {
          folder: "food-delivery",
          resource_type: "image",
        })
        if (uploadedResponse) {
        const newMenuItem = new MenuItem({
          name,
          description,
          price,
          category,
          image: uploadedResponse.secure_url,
        });
        const menuItem = await newMenuItem.save();
        restaurant.menu.push(menuItem._id);
        await restaurant.save();
        res.status(201).json({
          success: true,
          message: "Menu Item Added Successfully",
          menuItem,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
