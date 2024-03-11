import Order from '../models/order.model.js'
import Restaurant from '../models/restaurant.model.js';

// create order
export const createOrder = async (req, res, next) => {
    const { username, address, cartItems, restaurantId } = req.body;

    const restaurant = await Restaurant.findById(restaurantId)

    if (!address) {
        return res.status(404).json({
          success: false,
          message: "Add address or select to place order",
        });
    }

    if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found", 
        });
    }


    try {
         // Create a new order instance
         const newOrder = new Order({
            username: username,
            address: address,
            cartItems: cartItems,
            restaurantId: restaurantId
        });

        const order = await newOrder.save()

        restaurant.orders.push(order._id)

        await restaurant.save()

        res.status(200).json({ 
            success: true,
            message: 'Order received and saved successfully',
            newOrder
        });
       
    } catch (error) {
        next(error);
    }
};
