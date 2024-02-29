import React from "react";
import "./EmptyCart.scss";
import { Link } from 'react-router-dom'

export default function EmptyCart() {
    return (
        <section className="empty_cart">
            <h2>Your cart is empty</h2>
            <p>You can go to <Link to='/' className="empty_cart_home">home</Link> page to view more restaurants</p>
            <img
                src="https://hakimitr.com/assets/website/images/empty-cart.gif"
                alt="empty cart page"
            />
        </section>
    );
}
