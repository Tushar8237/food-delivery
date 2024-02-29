import React from "react";
import "./Cart.scss";
import { Link } from "react-router-dom";
import { clearCart } from "../../redux/cart-items/cartSlice";
import { useDispatch } from "react-redux";
import { BsBagCheck } from "react-icons/bs";

export default function Cart({ cartItems }) {
  const dispatch = useDispatch();
  
  return (
    <div className="cart_wrapper">
      {cartItems.length ? <p>{cartItems.length} items added</p> : ""}
      <div className="cart_right">
        <Link
          to="/checkout"
          style={{
            textDecoration: "none",
          }}
        >
          <span>
            <BsBagCheck className="cart_icon" />
            <span>VIEW CART</span>
          </span>
        </Link>
        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </div>
    </div>
  );
}
