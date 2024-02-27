import React, { useState } from "react";
import "./AddRestaurant.scss";
import { useNavigate } from 'react-router-dom'



export default function AddRestaurant() {
    const [loading, setLoading]= useState(false)
    const [formData, setFormData] = useState({
        name: "",
        rating: "",
        categories: [],
        phoneNumber: "",
        openTime: "",
        closeTime: "",
        approxTwo: ""
    });
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: "",
    });
    const navigate = useNavigate()


    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setFormData({ ...formData, categories: [...formData.categories, name] });
        } else {
            setFormData({
                ...formData,
                categories: formData.categories.filter((category) => category !== name),
            });
        }
    };

    const newFormData = {
        ...formData,
        address: {
            ...formData.address,
            ...address,
        },
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/restaurant/create/restaurant', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newFormData)
            })
            if (!res.ok) {
                throw new Error('Failed to add restaurant');
            }
            const data = await res.json()
            console.log('Restaurant added:', data);
            if(res.ok){
                navigate('/my-restaurant')
            }
        } catch (error) {
            console.error('Error adding restaurant:', error);
        }
    };

    console.log(newFormData)


    return (
        <main className="add_res_wrapper">
            <section className="add_res_section">
                <h2 className="add_res_heading">
                    Register your Restaurant and start earning
                </h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="rating">Rating</label>
                        <input
                            type="text"
                            name="rating"
                            id="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="item_categories">
                        <label className="categories">Categories :</label>
                        <input
                            type="checkbox"
                            name="Chinese"
                            id="chinese"
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor="chinese">Chinese</label>

                        <input
                            type="checkbox"
                            name="North Indian"
                            id="northIndian"
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor="northIndian">North Indian</label>

                        <input
                            type="checkbox"
                            name="Fast Food"
                            id="fastFood"
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor="fastFood">Fast Food</label>

                        <input
                            type="checkbox"
                            name="Sandwich"
                            id="sandwich"
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor="sandwich">Sandwich</label>

                        <input
                            type="checkbox"
                            name="biryani"
                            id="biryani"
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor="sandwich">Biryani</label>

                        <input
                            type="checkbox"
                            name="dessert"
                            id="dessert"
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor="sandwich">Dessert</label>

                        <input
                            type="checkbox"
                            name="beverages"
                            id="beverages"
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor="sandwich">Beverages</label>
                    </div>
                    <div>
                        <label htmlFor="street">Address</label>
                        <input
                            type="text"
                            name="street"
                            id="street"
                            placeholder="Street"
                            value={address.street}
                            onChange={handleAddChange}
                        />
                        <input
                            type="text"
                            name="city"
                            id="city"
                            placeholder="City"
                            value={address.city}
                            onChange={handleAddChange}
                        />
                        <input
                            type="text"
                            name="state"
                            id="state"
                            placeholder="State"
                            value={address.state}
                            onChange={handleAddChange}
                        />
                        <input
                            type="text"
                            name="zip"
                            id="zip"
                            placeholder="Zip"
                            value={address.zip}
                            onChange={handleAddChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Mobile number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Mobile number at restaurant"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="openTime">Open Time</label>

                        <input
                            type="time"
                            name="openTime"
                            id="openTime"
                            value={formData.openTime}
                            onChange={handleInputChange}
                            className="res_time"
                        />
                    </div>
                    <div>
                        <label htmlFor="closeTime">Close Time</label>
                        <input
                            type="time"
                            name="closeTime"
                            id="closeTime"
                            value={formData.closeTime}
                            onChange={handleInputChange}
                            className="res_time"
                        />
                    </div>
                    <div>
                        <label htmlFor="closeTime">Approx for two</label>
                        <input
                            type="number"
                            name="approxTwo"
                            id="approxTwo"
                            value={formData.approxTwo}
                            onChange={handleInputChange}
                            className="res_time"
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
                            fontFamily:  "Poppins",
                        }}
                        type="submit"
                    >
                       {
                        loading ? "Loading" : " Submit Details"
                       }
                    </button>
                </form>
            </section>
        </main>
    );
}