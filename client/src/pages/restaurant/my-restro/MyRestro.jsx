// import React from "react";
// import { useState } from "react";
// import "./MyRestro.scss";
// import { useSelector } from "react-redux";

// export default function MyRestro({ id }) {
//     const [menuData, setMenuData] = useState({})
//     const [menuItems, setMenuItems] = useState({
//         name: "",
//         description: "",
//         category: "",
//         price: "",
//         image: "",
//     });
//     console.log(menuItems)

//     const { restro, loading, error } = useSelector((state) => state.restro);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setMenuItems({ ...menuItems, [name]: value });
//     };
    
//     const handleFileInputChange = (e) => {
//         const file = e.target.files[0];
//         setMenuItems({ ...menuItems, image: file });
//     };
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // const res = await fetch(`/api/restaurant/add-menu/${id}`, {
//             const res = await fetch('/api/restaurant/add-menu', {
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json",
//                 },
//                 body: JSON.stringify(menuItems),
//             });
//             if (!res.ok) {
//                 throw new Error("Failed to add menu Item");
//             }
//             const data = await res.json();
//             setMenuData(data)
//             setMenuItems({
//                 name: "",
//                 description: "",
//                 category: "",
//                 price: "",
//             });
//         } catch (error) {
//             console.error("Error adding Menu Items:", error);
//         }
//     };


//     return (
//         <main className="my_restro_wrapper">
//             <section className="my_restro_section">
//                 <div>
//                     {restro?.restros?.map((res) =>
//                         res._id === id ? <p key={res._id}>{res.name}</p> : ""
//                     )}
//                 </div>
//                 <h2 className="my_restro_heading">Add Menu Items</h2>
//                 <form className="my_restro_menu" onSubmit={handleSubmit} encType="multipart/form-data">
//                     <div>
//                         <label htmlFor="name">Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             id="name"
//                             value={menuItems.name}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="rating">Description</label>
//                         <input
//                             type="text"
//                             name="description"
//                             id="description"
//                             value={menuItems.description}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="rating">Category</label>
//                         <input
//                             type="text"
//                             name="category"
//                             id="category"
//                             value={menuItems.category}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="rating">Price</label>
//                         <input
//                             type="number"
//                             name="price"
//                             id="price"
//                             value={menuItems.price}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="rating">Image</label>
//                         <input
//                             type="file" 
//                             accept="image/*"
//                             name="image"
//                             id="image"
//                             value={menuItems.image ? menuItems.image[0] : ''}
//                             onChange={handleFileInputChange}
//                         />
//                     </div>
//                     <button
//                         style={{
//                             padding: "0.5rem 1rem",
//                             fontSize: "1.2rem",
//                             fontWeight: "500",
//                             color: "white",
//                             backgroundColor: "blue",
//                             border: "none",
//                             borderRadius: "0.2rem",
//                             fontFamily: "Poppins",
//                             cursor: "pointer",
//                         }}
//                         type="submit"
//                     >
//                         {loading ? "Loading" : "Submit Menu Details"}
//                     </button>
//                 </form>
//                 <p className="menu_added_Successfully">{menuData ? menuData.message : ""}</p>
//             </section>
//         </main>
//     );
// }


import React from "react";
import { useState } from "react";
import "./MyRestro.scss";
import { useSelector } from "react-redux";

export default function MyRestro({ id }) {
    const [menuData, setMenuData] = useState({})
    const [menuItems, setMenuItems] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
    });
    console.log(menuItems)

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
            formData.append('name', menuItems.name);
            formData.append('description', menuItems.description);
            formData.append('category', menuItems.category);
            formData.append('price', menuItems.price);
            formData.append('image', menuItems.image);

            const res = await fetch(`/api/restaurant/add-menu/${id}`, {
                method: "POST",
                body: formData,
            });
            if (!res.ok) {
                throw new Error("Failed to add menu Item");
            }
            const data = await res.json();
            setMenuData(data)
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
                <div>
                    {restro?.restros?.map((res) =>
                        res._id === id ? <p key={res._id}>{res.name}</p> : ""
                    )}
                </div>
                <h2 className="my_restro_heading">Add Menu Items</h2>
                <form className="my_restro_menu" onSubmit={handleSubmit} encType="multipart/form-data">
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
                            value={menuItems.image ? menuItems.image[0] : ''}
                            onChange={handleFileInputChange}
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
                            cursor: "pointer",
                        }}
                        type="submit"
                    >
                        {loading ? "Loading" : "Submit Menu Details"}
                    </button>
                </form>
                <p className="menu_added_Successfully">{menuData ? menuData.message : ""}</p>
            </section>
        </main>
    );
}

