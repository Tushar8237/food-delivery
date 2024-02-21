import MenuItem from '../models/menuItem.model.js';
import Restaurant from '../models/restaurant.model.js';

export const addMenuItems = async (req, res, next) => {
    try {

        const { name, description, price, category } = req.body

        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({
              success: false,
              message: "Restaurant not found",
            });
        }
        
        const newMenuItem = new MenuItem({
            name, description, price, category
        })
        
        const menuItem = await newMenuItem.save() 

        restaurant.menu.push(menuItem._id)

        await restaurant.save()

        res.status(201).json({
            success: true,
            message: "Menu Item Added Successfully",
            menuItem
        });
    } catch (error) {
        next(error)
    }
}