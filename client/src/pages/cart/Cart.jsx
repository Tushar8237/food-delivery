import React from "react";
import "./Cart.scss";
import { Link } from "react-router-dom";
import { getIconPath, IconName } from "../../utils/getIconPath";
import { clearCart } from "../../redux/cart-items/cartSlice";
import { useDispatch } from "react-redux";

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
            <strong>VIEW CART</strong>
            <img  src={getIconPath(IconName.CART)} alt="Cart Imag"  className="cart_icon"/>
          </span>
        </Link>
        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </div>
    </div>
  );
}
