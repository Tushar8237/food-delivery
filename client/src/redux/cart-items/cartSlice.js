import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart: (state, action) => {
            const { _id, name, price, restaurantId} = action.payload;
            const existingItemIndex = state.cart.findIndex((cartItem) => cartItem._id === _id);
            if (existingItemIndex !== -1) {
                // If the item already exists in the cart, increase its quantity by 1
                state.cart[existingItemIndex].quantity += 1;
            } else {
                // If the item doesn't exist in the cart, add it to the cart with a quantity of 1
                state.cart.push({ _id, name, price, restaurantId, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const { _id } = action.payload;
            const existingItemIndex = state.cart.findIndex((cartItem) => cartItem._id === _id);
            if (existingItemIndex !== -1) {
                // If the item exists in the cart, decrease its quantity by 1
                state.cart[existingItemIndex].quantity -= 1;

                // If the quantity becomes 0, remove the item from the cart
                if (state.cart[existingItemIndex].quantity === 0) {
                    state.cart.splice(existingItemIndex, 1);
                }
            } 
        },
        clearCart: (state) => {
            // Clear the cart array
            state.cart = [];
        },
    }
})

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer