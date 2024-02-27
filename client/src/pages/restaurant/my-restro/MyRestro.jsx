import React from "react";
import { useState } from "react";
import "./MyRestro.scss";
import { useSelector } from "react-redux";

export default function MyRestro({ id }) {
  const [menuData, setMenuData] = useState({});
  const [menuItems, setMenuItems] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });
  const { restro, loading, error } = useSelector((state) => state.restro);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuItems({ ...menuItems, [name]: value });
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setMenuItems({ ...menuItems, image: file });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", menuItems.name);
      formData.append("description", menuItems.description);
      formData.append("category", menuItems.category);
      formData.append("price", menuItems.price);
      formData.append("image", menuItems.image);

      const res = await fetch(`/api/restaurant/add-menu/${id}`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to add menu Item");
      }
      const data = await res.json();
      setMenuData(data);
      setMenuItems({
        name: "",
        description: "",
        category: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding Menu Items:", error);
    }
  };

  return (
    <main className="my_restro_wrapper">
      <section className="my_restro_section">
        <div className="my_restro_details">
          {restro?.restros?.map((res) =>
            res._id === id ? (
              <div className="my_restro_heading" key={res._id}>
                <div className="my_restro_rating">
                  <h2>{res.name}</h2>
                  <span>{res.rating}.5</span>
                </div>
                <div className="my_restro_approx">
                  <p>{res.categories}</p>
                  <span
                    style={{
                      textDecoration: "underline",
                    }}
                  >
                    Rs{res.approxTwo} for two
                  </span>
                </div>
                <p className="my_restro_address">{res.address.street}</p>
                <div className="my_restro_open_distance">
                  <p id="my_restro_open">Opens at {res.openTime}</p>
                  <span>3.8 km</span>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
        <h2 className="my_restro_menu_title">Add Menu Items</h2>
        <form
          className="my_restro_menu"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={menuItems.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="rating">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={menuItems.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="rating">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              value={menuItems.category}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="rating">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={menuItems.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="rating">Image</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              value={menuItems.image ? menuItems.image[0] : ""}
              onChange={handleFileInputChange}
            />
          </div>
          <button className="menu_submit_btn" type="submit">
            {loading ? "Loading" : "Submit Menu Details"}
          </button>
        </form>
        <p className="menu_added_Successfully">
          {menuData ? menuData.message : ""}
        </p>
      </section>
    </main>
  );
}
