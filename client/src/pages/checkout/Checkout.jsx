import React from "react";
import "./Checkout.scss";
import item from "../../assets/restaurants/paneer-tikka.png";
import { Link } from "react-router-dom";

export default function Checkout() {
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

                        <div className="checkout_leftItems">
                            <div className="checkout_leftItemsLeft">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg"
                                    alt="veg icon"
                                />
                                <p>Paneer Tikka Masala</p>
                            </div>
                            <div className="checkout_leftItemsRight">
                                <div>
                                    <span>-</span>
                                    <strong>1</strong>
                                    <span>+</span>
                                </div>
                                <p>Rs 300</p>
                            </div>
                        </div>
                        <div className="checkout_leftBill">
                            <p className="checkout_leftBillDetails">Bill Details</p>
                            <div>
                                <p>Item Total</p>
                                <span>Rs300</span>
                            </div>
                            <div>
                                <p>Delivery Fee | 4.4 kms</p>
                                <span>Rs37</span>
                            </div>
                            <div>
                                <p>Platform fee</p>
                                <span>3</span>
                            </div>
                        </div>
                        <div className="checkout_leftTotal">
                            <span>TOPAY</span>
                            <span>Rs 341</span>
                        </div>
                    </div>
                </div>

                <div className="checkout_right">
                    <div className="checkout_rightTop">
                        <div className="checkout_rightDelivery">
                            <h3>Delivery address</h3>
                            <span style={{
                                color: "#fc8019",
                                cursor: "pointer"

                            }} >CHANGE</span>
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
