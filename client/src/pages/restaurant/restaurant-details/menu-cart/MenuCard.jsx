import React, { useState } from "react";
import "./MenuCard.scss";
import { addToCart, removeFromCart } from "../../../../redux/cart-items/cartSlice";
import { useDispatch, useSelector } from 'react-redux'

export default function MenuCard({ item}) {
    const [itemCount, setItemCount] = useState(0);
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.cart)
    
    // Find the quantity of the current item in the cart
    const itemInCart = cart.find(cartItem => cartItem._id === item._id);
    const itemQuantity = itemInCart ? itemInCart.quantity : 0;

    console.log(cart)
    
    return (
        <div className="restroDetails_menuWrapper" key={item._id}>
            <div className="restroDetails_menuItem">
                <div className="restroDetails_menuItemLeft">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg"
                        alt=""
                    />
                    <h3>{item.name}</h3>
                    <strong>Rs {item.price}</strong>
                    <p className="description">
                        {item.description.substring(0, 65) + "...Read more"}
                    </p>
                </div>
                <div className="restroDetails_menuItemRight">
                    <img src={item.image} alt="menu item" />
                    <div className="restroDetails_addBtn">
                        <button
                            type="button"
                            onClick={() => dispatch(removeFromCart(item))}
                        >
                            -
                        </button>
                        <p>{itemQuantity}</p>
                        <button
                            type="button"
                            onClick={() => dispatch(addToCart(item))}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
