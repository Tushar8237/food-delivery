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

// update menu item
export const updateMenuItem = async (req, res, next) => {
  try {
    const {name, description, price, category } = req.body
    const menuItem = await MenuItem.findById(req.params.id);
    const restaurant = await Restaurant.findById(req.params.res);
    
    // throw error if menu item or restaurant not found
    if (!menuItem || !restaurant) {
      return res.status(404).json({
        success: false,
        message: "Menu item or restaurant not found"
      });
    }

    // Check if the user is the owner of the restaurant
    if (restaurant.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update menu item"
      });
    }

    // Update the menu item fields
    menuItem.name = name;
    menuItem.description = description;
    menuItem.price = price;
    menuItem.category = category;

    // check if there is a new image uploaded
    if(req.files && req.files.image) {
      const file = req.files.image
      const uploadedResponse = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "food-delivery",
        resource_type: "image"
      })
      if(uploadedResponse){
        menuItem.image = uploadedResponse.secure_url
      }
    }

    // save the updated menu item
    const updatedMenuItem = await menuItem.save()

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      menuItem: updatedMenuItem
    });
  } catch (error) {
    next(error)
  }
}

// delete menu item
export const deleteMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    const restaurant = await Restaurant.findById(req.params.res);
    
    // throw error if menu item or restaurant not found
    if (!menuItem || !restaurant) {
      return res.status(404).json({
        success: false,
        message: "Menu item or restaurant not found"
      });
    }

    // Check if the user is the owner of the restaurant
    if (restaurant.owner.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    // Check if the menu item exists in the restaurant's menu array
    const existInResMenu = restaurant.menu.includes(req.params.id);

    if (!existInResMenu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found in the restaurant's menu"
      });
    }

    // Remove the menu item from the restaurant's menu array
    restaurant.menu = restaurant.menu.filter(item => item.toString() !== req.params.id);
    await restaurant.save();

    // You may want to delete the menu item document from the MenuItem collection as well
    await menuItem.deleteOne();

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Menu item deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
