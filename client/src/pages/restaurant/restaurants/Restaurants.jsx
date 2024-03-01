import React, { useEffect, useState } from "react";
import "./Restaurants.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    restroStart,
    restroSuccess,
    restroFailure,
} from "../../../redux/restaurants/restaurantsSlice";
import Loading from "./../../../components/loader/Loading";

export default function Restaurants() {
    const dispatch = useDispatch();
    const { restro, loading, error } = useSelector((state) => state.restro);
    const [showFiltered, setShowFiltered] = useState(false);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(restroStart());
                const response = await fetch("/api/restaurant/");
                const result = await response.json();
                if (!response.ok) {
                    dispatch(restroFailure());
                    return;
                }
                dispatch(restroSuccess(result));
                setFilteredRestaurants(result.restros);
            } catch (error) {
                dispatch(restroFailure(error));
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (showFiltered) {
            setFilteredRestaurants(restro.restros.filter((res) => res.rating >= 4));
        } else {
            setFilteredRestaurants(restro.restros);
        }
    }, [showFiltered, restro]);

    const handleToggleClick = () => {
        setShowFiltered(!showFiltered);
    };

    return (
        <main className="restaurants_wrapper">
            <div className="restaurants_top">
                <h2>Popular restaurants near you </h2>
                <input
                    type="button"
                    value={showFiltered ? "Show All Restaurants" : "Ratings 4.0+"}
                    onClick={handleToggleClick}  
                />
            </div>

            <div className="restaurant_cardWrapper">
                {loading ? (
                    <Loading />
                ) : (
                    filteredRestaurants.map((res) => (
                        <Link
                            to={`/restaurant-details/${res?.city.toLowerCase()}/${res.slug
                                }`}
                            className="restaurant_cardLink"
                            key={res._id}
                        >
                            <div className="restaurant_card">
                                <img src={res.image} alt="restros" className="restaurant_img" />
                                <div className="restaurant_nameRating">
                                    <p>{res.name.substring(0, 17) + "..."}</p>
                                    <span>{res.rating}</span>
                                </div>
                                <div className="restaurant_itemApprox">
                                    <p>{res.categories}</p>
                                    <span>Rs{res.approxTwo} for two</span>
                                </div>
                                <p className="restaurants_address">{res?.street}</p>
                                <div className="restaurant_openDistance">
                                    <p id="restaurant_open">Opens at {res.openTime}</p>
                                    <span>3.8 km</span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </main>
    );
}
