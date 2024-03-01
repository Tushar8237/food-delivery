import Address from "../models/address.model.js";
import { errorHandler } from "../utils/error.js";

// save address
export const saveAddress = async (req, res, next) => {
    try {
        const {flatNo, street, city, type, coordinates } = req.body;
        const userId = req.user.id;
        const address = new Address({
            flatNo,
            street,
            city,
            type,
            location: {
                type: 'Point',
                coordinates
            },
            user: userId
        });

        const savedAddress = await address.save();
        res.status(201).json(savedAddress);

        res.status(201).json({
            success: true,
            message: "Address save successfully",
            savedAddress,
        })
    } catch (error) {
       next(error)
    }
};

// get address
export const getAllAddresses = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        // Find all addresses associated with the logged-in user
        const addresses = await Address.find({ user: userId });

        res.status(200).json({
            success: true,
            addresses
        });
    } catch (error) {
        next(error)
    }
};

// delete address
export const deleteAddress = async (req, res, next) => {
    try {
        
        // Find the address to delete
        const address = await Address.findById(req.params.id);

        // If address is not found or does not belong to the user, return 404
        if (!address) {
            return next(errorHandler(404, 'Address not found or does not belong to the user'));
        }

        // Delete the address
        await address.deleteOne();

        res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
