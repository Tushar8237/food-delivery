import React from "react";
import './Address.scss'

export default function Address() {
    return (
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
    );
}
