import React from "react";
import "./EmptyCart.scss";

export default function EmptyCart() {
    return (
        <section className="empty_cart">
            <h2>Your cart is empty</h2>
            <p>You can go to home page to view more restaurants</p>
            <img
                src="https://hakimitr.com/assets/website/images/empty-cart.gif"
                alt="empty cart page"
            />
        </section>
    );
}
