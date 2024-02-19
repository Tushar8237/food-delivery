import React, { useState } from "react";
import "./RestaurantDetails.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import item from "../../assets/restaurants/paneer-tikka.png";
import { Suspense } from "react";
import Cart from "../cart/Cart";

const restroImg = [
  {
    id: 1,
    imgUrl:
      "https://b.zmtcdn.com/data/pictures/4/18623894/a99ebefef9a363aaffc2a599b91aeebd.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
  },
  {
    id: 2,
    imgUrl:
      "https://b.zmtcdn.com/data/pictures/chains/4/18623894/087d0c2bcda58a107b135b783c1b9f38.jpg?output-format=webp",
  },
  {
    id: 3,
    imgUrl:
      "https://b.zmtcdn.com/data/pictures/chains/4/18623894/92050a16b49d54d2286f10d5115f87e8.jpeg?output-format=webp",
  },
  {
    id: 4,
    imgUrl:
      "https://b.zmtcdn.com/data/pictures/chains/4/18623894/ee7955c76f3c7caeba806fa43d0ab1b2.jpeg?output-format=webp",
  },
  {
    id: 5,
    imgUrl:
      "https://b.zmtcdn.com/data/pictures/4/18623894/a99ebefef9a363aaffc2a599b91aeebd.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
  },
  {
    id: 6,
    imgUrl:
      "https://b.zmtcdn.com/data/pictures/chains/4/18623894/087d0c2bcda58a107b135b783c1b9f38.jpg?output-format=webp",
  },
  {
    id: 7,
    imgUrl:
      "https://b.zmtcdn.com/data/pictures/chains/4/18623894/92050a16b49d54d2286f10d5115f87e8.jpeg?output-format=webp",
  },
  {
    id: 8,
    imgUrl:
      "https://b.zmtcdn.com/data/pictures/chains/4/18623894/ee7955c76f3c7caeba806fa43d0ab1b2.jpeg?output-format=webp",
  },
];

export default function RestaurantDetails() {
  const [itemCount, setItemCount] = useState(0);
  const cartItems = [1];

  return (
    <main className="restroDetails_wrapper">
      <section className="restroDetails_section">
        <div className="restroDetails_imgSlider">
          <Carousel
            showArrows={true}
            swipeable={true}
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
          >
            {restroImg.map((img) => (
              <div className="restroDetails_imgs" key={img.id}>
                <img src={img.imgUrl} alt="img name" />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="restroDetails_headingWrapper">
          <div className="restroDetails_nameRating">
            <h2>Bouffage</h2>
            <span>4.5</span>
          </div>
          <div className="restroDetails_itemApprox">
            <p>Sandwich, Fast Food, stre...</p>
            <span
              style={{
                textDecoration: "underline",
              }}
            >
              Rs800 for two
            </span>
          </div>
          <p className="restroDetails_address">Dharampeth, Nagpur</p>
          <div className="restroDetails_openDistance">
            <p id="restroDetails_open">Opens at 7am</p>
            <span>3.8 km</span>
          </div>
        </div>

        <div className="restroDetails_toggleBtn">
          <p>Veg Only</p>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="restroDetails_menuWrapper">
          <div className="restroDetails_menuItem">
            <div className="restroDetails_menuItemLeft">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg"
                alt=""
              />
              <h3>Paneer Tikka Masala</h3>
              <strong>Rs 389</strong>
              <p className="description">
                Soft paneer cubes marinated in a seasoned masala and cooked in a
                tandoor.
              </p>
            </div>
            <div className="restroDetails_menuItemRight">
              <img src={item} alt="menu item" />
              <div className="restroDetails_addBtn">
                <button
                  type="button"
                  onClick={() => setItemCount((prevCount) => prevCount - 1)}
                >
                  -
                </button>
                <p>{itemCount}</p>
                <button
                  type="button"
                  onClick={() => setItemCount((prevCount) => prevCount + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="restroDetails_menuItem">
            <div className="restroDetails_menuItemLeft">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg"
                alt=""
              />
              <h3>Paneer Tikka Masala</h3>
              <strong>Rs 389</strong>
              <p>
                Soft paneer cubes marinated in a seasoned masala and cooked in a
                tandoor.
              </p>
            </div>
            <div className="restroDetails_menuItemRight">
              <img src={item} alt="menu item" />
              <div className="restroDetails_addBtn">
                <button type="button">-</button>
                <p>0</p>
                <button type="button">+</button>
              </div>
            </div>
          </div>
          <div className="restroDetails_menuItem">
            <div className="restroDetails_menuItemLeft">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Non_veg_symbol.svg"
                alt=""
              />
              <h3>Chicken Tikka Masala</h3>
              <strong>Rs 450</strong>
              <p>
                Soft chicken peace marinated in a seasoned masala and cooked in
                a tandoor.
              </p>
            </div>
            <div className="restroDetails_menuItemRight">
              <img src={item} alt="menu item" />
              <div className="restroDetails_addBtn">
                <button type="button">-</button>
                <p>0</p>
                <button type="button">+</button>
              </div>
            </div>
          </div>
          <div className="restroDetails_menuItem">
            <div className="restroDetails_menuItemLeft">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Non_veg_symbol.svg"
                alt=""
              />
              <h3>Mutton Tikka Masala</h3>
              <strong>Rs 600</strong>
              <p>
                Soft Mutton peace marinated in a seasoned masala and cooked in a
                tandoor.
              </p>
            </div>
            <div className="restroDetails_menuItemRight">
              <img src={item} alt="menu item" />
              <div className="restroDetails_addBtn">
                <button type="button">-</button>
                <p>0</p>
                <button type="button">+</button>
              </div>
            </div>
          </div>
          <div className="restroDetails_menuItem">
            <div className="restroDetails_menuItemLeft">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Non_veg_symbol.svg"
                alt=""
              />
              <h3>Mutton Tikka Masala</h3>
              <strong>Rs 600</strong>
              <p>
                Soft Mutton peace marinated in a seasoned masala and cooked in a
                tandoor.
              </p>
            </div>
            <div className="restroDetails_menuItemRight">
              <img src={item} alt="menu item" />
              <div className="restroDetails_addBtn">
                <button type="button">-</button>
                <p>0</p>
                <button type="button">+</button>
              </div>
            </div>
          </div>
        </div>

        {cartItems.length ? (
          <div className="restroDetails_cartWrapper">
            <Cart />
          </div>
        ) : (
          ""
        )}
      </section>
    </main>
  );
}
