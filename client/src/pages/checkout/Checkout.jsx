import React from "react";
import "./Checkout.scss";
import item from "../../assets/restaurants/paneer-tikka.png";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cart-items/cartSlice";
export default function Checkout() {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 47
    const platFormFee = 3

    const total = totalPrice + deliveryFee + platFormFee

    
    return (
        <main className="checkout_wrapper">
            <section className="checkout_section">
                <div className="checkout_left">
                    <div className="checkout_leftTop">
                        <div className="checkout_leftRestro">
                            <div>
                                <img src={item} alt="Restaurant Image" />
                            </div>
                            <div>
                                <h3>Bouffage</h3>
                                <span>Dharampeth</span>
                            </div>
                        </div>

                        {cart.map((item) => (
                            <div className="checkout_leftItems" key={item._id}>
                                <div className="checkout_leftItemsLeft">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg"
                                        alt="veg icon"
                                    />
                                    <p>{item.name}</p>
                                </div>
                                <div className="checkout_leftItemsRight">
                                    <div>
                                        <span onClick={() => dispatch(removeFromCart(item))}>
                                            -
                                        </span>
                                        <strong>{item.quantity}</strong>
                                        <span onClick={() => dispatch(addToCart(item))}>+</span>
                                    </div>
                                    <p>Rs{item.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}

                        <div className="checkout_leftBill">
                            <p className="checkout_leftBillDetails">Bill Details</p>
                            <div>
                                <p>Item Total</p>
                                <span>Rs{totalPrice}</span>
                            </div>
                            <div>
                                <p>Delivery Fee | 4.4 kms</p>
                                <span>Rs{deliveryFee}</span>
                            </div>
                            <div>
                                <p>Platform fee</p>
                                <span>{platFormFee}</span>
                            </div>
                        </div>
                        <div className="checkout_leftTotal">
                            <span>TOPAY</span>
                            <span>Rs {total}</span>
                        </div>
                    </div>
                </div>

                <div className="checkout_right">
                    <div className="checkout_rightTop">
                        <div className="checkout_rightDelivery">
                            <h3>Delivery address</h3>
                            <span
                                style={{
                                    color: "#fc8019",
                                    cursor: "pointer",
                                }}
                            >
                                CHANGE
                            </span>
                        </div>
                        <div className="checkout_rightAddress">
                            <h3>Home</h3>
                            <p>
                                H.No 46 Upasana, Rajendra Nagar, Yashoda, Nagpur, Maharashtra
                                440036, India,
                            </p>
                            <span>50 MINS</span>
                        </div>
                    </div>
                    <div className="checkout_rightBottom">
                        <h3>Choose payment method</h3>
                        <div>
                            <span>PROCEED TO PAY</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
