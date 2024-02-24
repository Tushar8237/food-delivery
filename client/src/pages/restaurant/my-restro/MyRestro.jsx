import React from "react";
import { useState } from "react";
import "./MyRestro.scss"

export default function MyRestro() {
    const [loading, setLoading] = useState(false)
    const [menuItems, setMenuItems] = useState({
        name: "",
        description: "",
        category: "",
        price: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setMenuItems({ ...menuItems, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/restaurant/add-menu/65d74ee477144224c367c1e7', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(menuItems)
            })
            if (!res.ok) {
                throw new Error('Failed to add menu Item');
            }
            const data = await res.json()
            console.log('Menu Items added successfully:', data);
            setMenuItems({
                name: "",
                description: "",
                category: "",
                price: ""
            })
        } catch (error) {
            console.error('Error adding Menu Items:', error);
        }
    };

    return (
        <main className="my_restro_wrapper">
            <section className="my_restro_section">
                <div>restro details name and address</div>
                <h2 className="my_restro_heading">
                    Add Menu Items
                </h2>
                <form className="my_restro_menu" onSubmit={handleSubmit}>
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
                    <button
                        style={{
                            padding: "0.5rem 1rem",
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "white",
                            backgroundColor: "blue",
                            border: "none",
                            borderRadius: "0.2rem",
                            fontFamily: "Poppins",
                        }}
                        type="submit"
                    >
                        {
                            loading ? "Loading" : "Submit Menu Details"
                        }
                    </button>
                </form>
            </section>
        </main>
    );
}