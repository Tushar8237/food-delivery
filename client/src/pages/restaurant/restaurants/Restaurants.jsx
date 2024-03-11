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

let itemsName = [
  {
    id: 1,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/PC_Creative%20refresh/3D_bau/banners_new/Pizza.png",
    name: "Pizza",
  },
  {
    id: 2,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/Biryani_2.png",
    name: "Biryani",
  },
  {
    id: 3,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029848/PC_Creative%20refresh/3D_bau/banners_new/Chinese.png",
    name: "Chines",
  },
  {
    id: 4,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/North_Indian_4.png",
    name: "North Indian",
  },
  {
    id: 5,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Shakes.png",
    name: "Shake",
  },
  {
    id: 6,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029854/PC_Creative%20refresh/3D_bau/banners_new/Pasta.png",
    name: "Pasta",
  },
];

export default function Restaurants() {
  const dispatch = useDispatch();
  const { restro, loading, error } = useSelector((state) => state.restro);
  const [showFiltered, setShowFiltered] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");

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
    setActiveFilter("");
  };

  const showRestaurantByItems = (name) => {
    setActiveFilter(name);
    if (name === "All") {
      setFilteredRestaurants(restro.restros);
    } else {
      setFilteredRestaurants(
        restro.restros.filter((res) => {
          return res.menu.some((item) =>
            item.name.toLowerCase().includes(name.toLowerCase())
          );
        })
      );
    }
  };

  return (
    <main className="restaurants_wrapper">
      <div className="restaurants_top">
        {itemsName.map((item) => (
          <div key={item.id} onClick={() => showRestaurantByItems(item.name)}>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>


      {activeFilter && (
        <div className="restaurants_clear_filter">
          <button onClick={() => showRestaurantByItems("All")}>
           Clear Filter: {activeFilter}
          </button>
        </div>
      )} 

      <div className="restaurants_mid">
        <h2>Popular restaurants near you </h2>
        <input
          type="button"
          value={showFiltered ? "Show All Restaurants" : "Ratings 4.0+"}
          onClick={handleToggleClick}
        />
      </div>

      <h2 id="restaurants_near">Popular restaurants near you </h2>


      <div className="restaurant_cardWrapper">
        {loading ? (
          <Loading />
        ) : (
          filteredRestaurants?.map((res) => (
            <Link
              to={`/restaurant-details/${res?.city.toLowerCase()}/${res.slug}`}
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
