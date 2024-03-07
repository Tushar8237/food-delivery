import React, { useEffect, useState } from "react";
import "./OrderSuccess.scss";

export default function OrderSuccess() {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="order_success_wrapper">
            <div className="order_success_animation_container">
                <div className="check_background">
                    <svg
                        viewBox="0 0 65 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 25L27.3077 44L58.5 7"
                            stroke="white"
                            strokeWidth={13}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div className="check_shadow" />
            </div>
            {showText && <p>Order Placed Successfully!</p>}
        </div>
    );
}
