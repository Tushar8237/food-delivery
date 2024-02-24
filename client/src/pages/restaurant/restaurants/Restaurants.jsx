import React, { useEffect } from "react";
import "./Restaurants.scss";
import img from "../../../assets/restaurants/buffage.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  restroStart,
  restroSuccess,
  restroFailure,
} from "../../../redux/restaurants/restaurantsSlice";

export default function Restaurants() {
  const dispatch = useDispatch();
  const { restro, loading, error } = useSelector((state) => state.restro);

  // console.log(restro);

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
      } catch (error) {
        dispatch(restroFailure(error));
      }
    };
    fetchData();
  }, []);
  
  return (
    <main className="restaurants_wrapper">
      <h2>Popular restaurants near you </h2>
      <div className="restaurant_cardWrapper">
        {restro?.restros?.map((res) => (
          <Link
            to={`/restaurant-details/${res.address.city.toLowerCase()}/${res.slug}`}
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
              <p className="restaurants_address">{res.address.street}</p>
              <div className="restaurant_openDistance">
                <p id="restaurant_open">Opens at {res.openTime}</p>
                <span>3.8 km</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
