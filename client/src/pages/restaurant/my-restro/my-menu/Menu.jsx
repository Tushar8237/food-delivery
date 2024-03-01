import React, { useEffect, useState } from "react";
import "./Menu.scss";
import { useSelector } from "react-redux";
import { updateStart } from "../../../../redux/update-menu/menuUpdateSlice";

export default function Menu({ res }) {
    const { currentUser } = useSelector((state) => state.user);
    const [menuItems, setMenuItems] = useState(res.menu);
    const [editedItem, setEditedItem] = useState();
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModel, setShowModel] = useState(false);

    const handleDeleteMenuItem = async (resId, itemId) => {
        try {
            if (!currentUser) {
                navigate("/sign-in");
                return;
            }
            const response = await fetch(`/api/restaurant/${resId}/${itemId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                // Remove the deleted item from menuItems state
                setMenuItems((prevMenuItems) =>
                    prevMenuItems.filter((item) => item._id !== itemId)
                );
                const data = await response.json();
                setData(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEditMenuItem = (item) => {
        setShowModel(true);
        setEditedItem(item);
        setData("")
    };

    const handleUpdateMenuItem = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (!currentUser) {
                navigate("/sign-in");
                return;
            }
            const response = await fetch(
                `/api/restaurant/${res._id}/${editedItem._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editedItem),
                }
            );
            if (!response.ok) {
                throw new Error("something went wrong can not update menu");
            }

            const data = await response.json();
            setData(data);

            if (response.ok) {
                const updatedMenuItems = menuItems.map((item) =>
                    item._id === editedItem._id ? editedItem : item
                );
                setMenuItems(updatedMenuItems);
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setEditedItem({ ...editedItem, image: file });
    };

    return (
        <main className="menu_wrapper">
            <p
                style={{
                    fontFamily: "poppins",
                    margin: "0.5rem 0",
                }}
            >
                Menu Items
            </p>
            {menuItems.map((item) => (
                <div className="menu_details" key={item._id}>
                    <p>{item.name}</p>
                    <div className="menu_details_right">
                        <span>Rs{item.price}</span>
                        <button
                            type="button"
                            onClick={() => handleDeleteMenuItem(res._id, item._id)}
                        >
                            Delete
                        </button>
                        <button type="button" onClick={() => handleEditMenuItem(item)}>
                            Edit
                        </button>
                    </div>
                </div>
            ))}

            {showModel ? (
                <div className="update_menu_model">
                    <button
                        className="update_model_close"
                        onClick={() => setShowModel(false)}
                    >
                        close
                    </button>
                    <form onSubmit={handleUpdateMenuItem}>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            id="name"
                            value={editedItem.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            name="description"
                            id="description"
                            value={editedItem.description}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            name="category"
                            id="category"
                            value={editedItem.category}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={editedItem.price}
                            name="price"
                            id="price"
                            onChange={handleInputChange}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            id="image"
                            onChange={handleFileInputChange}
                        />
                        <button className="update_menu_submit_btn" type="submit">
                            {loading ? "Loading" : "Submit Details"}
                        </button>

                        {/* <p className="menu_update_Successfully">
                            {data.message ? data.message : ""}
                        </p> */}

                        {!loading && data.message && (
                            <p className="menu_update_Successfully">{data.message}</p>
                        )}
                    </form>
                </div>
            ) : (
                ""
            )}
        </main>
    );
}
