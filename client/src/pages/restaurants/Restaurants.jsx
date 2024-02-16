import React from "react";
import "./Restaurants.scss";
import img from "../../assets/restaurants/buffage.png";

export default function Restaurants() {
  return (
    <main className="restaurants_wrapper">
      <h2>Popular restaurants near you </h2>
      <div className="restaurant_cardWrapper">
        <div className="restaurant_card">
          <img src={img} alt="restros" className="restaurant_img" />
          <div className="restaurant_nameRating">
            <p>Bouffage</p>
            <span>4.5</span>
          </div>
          <div className="restaurant_itemApprox">
            <p>Sandwich, Fast Food, stre...</p>
            <span>Rs800 for two</span>
          </div>
          <p className="restaurants_address">Dharampeth, Nagpur</p>
          <div className="restaurant_openDistance">
            <p id="restaurant_open">Opens at 7am</p>
            <span>3.8 km</span>
          </div>
        </div>

        <div className="restaurant_card">
          <img src={img} alt="restros" className="restaurant_img" />
          <div className="restaurant_nameRating">
            <p>Bouffage</p>
            <span>4.5</span>
          </div>
          <div className="restaurant_itemApprox">
            <p>Sandwich, Fast Food, stre...</p>
            <span>Rs800 for two</span>
          </div>
          <p className="restaurants_address">Dharampeth, Nagpur</p>
          <div className="restaurant_openDistance">
            <p id="restaurant_open">Opens at 7am</p>
            <span>3.8 km</span>
          </div>
        </div>

        <div className="restaurant_card">
          <img src={img} alt="restros" className="restaurant_img" />
          <div className="restaurant_nameRating">
            <p>Bouffage</p>
            <span>4.5</span>
          </div>
          <div className="restaurant_itemApprox">
            <p>Sandwich, Fast Food, stre...</p>
            <span>Rs800 for two</span>
          </div>
          <p className="restaurants_address">Dharampeth, Nagpur</p>
          <div className="restaurant_openDistance">
            <p id="restaurant_open">Opens at 7am</p>
            <span>3.8 km</span>
          </div>
        </div>

        <div className="restaurant_card">
          <img src={img} alt="restros" className="restaurant_img" />
          <div className="restaurant_nameRating">
            <p>Bouffage</p>
            <span>4.5</span>
          </div>
          <div className="restaurant_itemApprox">
            <p>Sandwich, Fast Food, stre...</p>
            <span>Rs800 for two</span>
          </div>
          <p className="restaurants_address">Dharampeth, Nagpur</p>
          <div className="restaurant_openDistance">
            <p id="restaurant_open">Opens at 7am</p>
            <span>3.8 km</span>
          </div>
        </div>

        <div className="restaurant_card">
          <img src={img} alt="restros" className="restaurant_img" />
          <div className="restaurant_nameRating">
            <p>Bouffage</p>
            <span>4.5</span>
          </div>
          <div className="restaurant_itemApprox">
            <p>Sandwich, Fast Food, stre...</p>
            <span>Rs800 for two</span>
          </div>
          <p className="restaurants_address">Dharampeth, Nagpur</p>
          <div className="restaurant_openDistance">
            <p id="restaurant_open">Opens at 7am</p>
            <span>3.8 km</span>
          </div>
        </div>

        <div className="restaurant_card">
          <img src={img} alt="restros" className="restaurant_img" />
          <div className="restaurant_nameRating">
            <p>Bouffage</p>
            <span>4.5</span>
          </div>
          <div className="restaurant_itemApprox">
            <p>Sandwich, Fast Food, stre...</p>
            <span>Rs800 for two</span>
          </div>
          <p className="restaurants_address">Dharampeth, Nagpur</p>
          <div className="restaurant_openDistance">
            <p id="restaurant_open">Opens at 7am</p>
            <span>3.8 km</span>
          </div>
        </div>
      </div>
    </main>
  );
}
