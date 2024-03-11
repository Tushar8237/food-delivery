import React, { useState } from "react";
import "./RestaurantDetails.scss";
import Cart from "../../cart/Cart";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CarouselPage from "./carousel/Carousel";
import MenuCard from "./menu-cart/MenuCard";

export default function RestaurantDetails() {
    const { slug } = useParams();
    const { restro, loading, error } = useSelector((state) => state.restro);
    const { cart } = useSelector((state) => state.cart);
    const [showVeg, setShowVeg] = useState(false)

    const handleToggle = () => {
        setShowVeg(!showVeg)
    }
    
    return (
        <main className="restroDetails_wrapper">
            <section className="restroDetails_section">
                <CarouselPage />
                {restro?.restros?.map((res) =>
                    res.slug === slug ? (
                        <React.Fragment key={res._id}>
                            <div className="restroDetails_headingWrapper">
                                <div className="restroDetails_nameRating">
                                    <h2>{res.name}</h2>
                                    <span>{res.rating}</span>
                                </div>
                                <div className="restroDetails_itemApprox">
                                    <p>{res.categories}</p>
                                    <span
                                        style={{
                                            textDecoration: "underline",
                                        }}
                                    >
                                        Rs{res.approxTwo} for two
                                    </span>
                                </div>
                                <p className="restroDetails_address">{res?.street}</p>
                                <div className="restroDetails_openDistance">
                                    <p id="restroDetails_open">Opens at {res.openTime}</p> 
                                    <span>3.8 km</span>
                                </div>
                            </div>

                            <div className="restroDetails_toggleBtn">
                                <p>Veg Only</p>
                                <label className="switch">
                                    <input type="checkbox" checked={showVeg} onChange={handleToggle}/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            {res.menu
                                .filter((item) => !showVeg || item.foodType === "Veg") // Filter based on showVeg state
                                .map((item) => (
                                    <MenuCard key={item._id} item={item} />
                            ))}
                        </React.Fragment>
                    ) : (
                        ""
                    )
                )}
                {cart.length ? (
                    <div className="restroDetails_cartWrapper">
                        <Cart cartItems={cart} />
                    </div>
                ) : (
                    ""
                )}
            </section>
        </main>
    );
}
