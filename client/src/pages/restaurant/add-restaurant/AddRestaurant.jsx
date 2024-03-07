import React, { useState } from "react";
import "./AddRestaurant.scss";
import { useNavigate } from 'react-router-dom'

export default function AddRestaurant() {
    const [loading, setLoading]= useState(false)
    const [formData, setFormData] = useState({
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        rating: "",
        categories: [],
        phoneNumber: "",
        openTime: "",
        closeTime: "",
        approxTwo: "",
        image: "",

    });
    
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); 
    };
    
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setFormData({...formData, image : file})
    }

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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resData = new FormData()
            resData.append("name", formData.name)
            resData.append("rating", formData.rating)
            resData.append("categories", formData.categories)
            resData.append("phoneNumber", formData.phoneNumber)
            resData.append("openTime", formData.openTime)
            resData.append("closeTime", formData.closeTime)
            resData.append("approxTwo", formData.approxTwo)
            resData.append("image", formData.image)
            resData.append("street", formData.street)
            resData.append("city", formData.city)
            resData.append("state", formData.state)
            resData.append("zip", formData.zip)
            const res = await fetch('/api/restaurant/create/restaurant', {
                method: 'POST',
                body: resData,
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
                            <label htmlFor="rating">Image</label>
                            <input
                            type="file"
                            accept="image/*"
                            name="image"
                            id="image"
                            value={formData.image ? formData.image[0] : ""}
                            onChange={handleFileInputChange}
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
                            value={formData.street}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="city"
                            id="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="state"
                            id="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="zip"
                            id="zip"
                            placeholder="Zip"
                            value={formData.zip}
                            onChange={handleInputChange}
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
                            cursor: "pointer"
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