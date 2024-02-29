import React, { useState } from "react";
import "./Menu.scss";
import { useSelector } from "react-redux";

export default function Menu({ res }) {
    // const { currentUser } = useSelector((state) => state.user);
    // const [data, setData] = useState("");

    // const handleDeleteMenuItem = async (res, id) => {
    //     try {
    //         if (!currentUser) {
    //             navigate("/sign-in");
    //             return;
    //         }
    //         const response = await fetch(`/api/restaurant/${res}/${id}`, {
    //             method: "DELETE",
    //         });
    //         if (response.ok) {
    //             const data = await response.json();
    //             setData(data.message);
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    const { currentUser } = useSelector((state) => state.user);
    const [menuItems, setMenuItems] = useState(res.menu);
    const [data, setData] = useState("");

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
                setMenuItems(prevMenuItems => prevMenuItems.filter(item => item._id !== itemId));
                const data = await response.json();
                setData(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <main>
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
                        <button type="button">Edit</button>
                    </div>
                </div>
            ))}
        </main>
    );
}
