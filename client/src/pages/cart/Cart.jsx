import React from "react";
import "./Cart.scss";
import { Link } from 'react-router-dom'
import { getIconPath, IconName } from "../../utils/getIconPath";


export default function Cart() {
  return (
    <Link to='/checkout' style={{
        textDecoration: "none"
    }}>
      <div className="cart_wrapper">
        <p>2 items added</p>
        <span>
          <strong>VIEW CART</strong>
          <img  src={getIconPath(IconName.CART)} alt="Cart Imag"  className="cart_icon"/>
        </span>
      </div>
    </Link>
  );
}
