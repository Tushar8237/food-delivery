import React, { useEffect } from "react";
import "./SearchItem.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SearchItem({ suggestions }) {
  const { restro, loading, error } = useSelector((state) => state.restro);

  // Check if suggestions exist before filtering
  const filteredRestaurants = suggestions
    ? restro.restros.filter((restaurant) =>
        suggestions.some((item) => restaurant._id === item.restaurantId) 
      )
    : [];
    
    return suggestions?.length ? (
    <main className="search_items_wrapper">
      <div className="search_items_section">
        {filteredRestaurants?.map((res) => (
          <Link
            to={`/restaurant-details/${res?.city.toLowerCase()}/${res.slug}`}
            className="search_items_link" key={res._id}
          >
            <div className="search_items_card">
              <div className="search_items_res_title">
                <p>{res.name}</p>
                <span>{res.rating}</span>
              </div>

              {suggestions?.map((item) =>
                item.restaurantId === res._id ? (
                  <div className="search_items_menu_card" key={item._id}>
                    <p>{item.name}</p>
                    <img src={item.image} alt="" />
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  ) : (
    <></>
  );
}
