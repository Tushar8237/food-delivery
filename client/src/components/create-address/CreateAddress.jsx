// import React, { useEffect, useState } from "react";
// import "./CreateAddress.scss";
// import { FaRegWindowClose, FaHome, FaMapMarkerAlt } from "react-icons/fa";
// import { MdOutlineWorkOutline } from "react-icons/md";

// export default function CreateAddress({handleCloseAddressModel, setShowModel}) {
//     const [address, setAddress] = useState({
//         flatNo: "",
//         street: "",
//         city: "",
//         number: "",
//         type: "",
//     });

//     const handleChange = (e) => {
//         setAddress({ ...address, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('/api/save-address', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(address),
//             });
//             if (!response.ok) {
//               throw new Error('Failed to save address');
//             }
//             const data = await response.json();
//             setShowModel(false)
//             // You can redirect to another page or update state here as needed
//           } catch (error) {
//             console.error('Error saving address:', error.message);
//           }
//     };
    
//     return (
//         <main className="create_address_wrapper">
//             <span className="close_Address_model" onClick={handleCloseAddressModel}>
//             <FaRegWindowClose className="close_Address_model_icon"/>
//             </span>
//             <section className="create_address_section">
//                 <h2>Save Address</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         name="flatNo"
//                         placeholder="Flat No"
//                         value={address.flatNo}
//                         onChange={handleChange}
//                     />
//                     <input
//                         type="text"
//                         name="street"
//                         placeholder="Street"
//                         value={address.street}
//                         onChange={handleChange}
//                     />
//                     <input
//                         type="text"
//                         name="city"
//                         placeholder="City"
//                         value={address.city}
//                         onChange={handleChange}
//                     />
//                      <input
//                         type="number"
//                         name="number"
//                         placeholder="Contact Number"
//                         value={address.number}
//                         onChange={handleChange}
//                     />

//                     <div className="create_address_type">
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="type"
//                                 value="Home"
//                                 checked={address.type === "Home"}
//                                 onChange={handleChange}
//                             />
                            
//                             <FaHome className="create_address_type_icon"/>
//                         </label>

//                         <label>
//                             <input
//                                 type="radio"
//                                 name="type"
//                                 value="Work"
//                                 checked={address.type === "Work"}
//                                 onChange={handleChange}
//                             />
//                             <MdOutlineWorkOutline className="create_address_type_icon"/>
                            
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="type"
//                                 value="Other"
//                                 checked={address.type === "Other"}
//                                 onChange={handleChange}
//                             />
//                             <FaMapMarkerAlt className="create_address_type_icon"/>
                            
//                         </label>
//                     </div>

//                     <div className="create_address_submit_btn">
//                         <button type="submit">
//                            Save Address
//                         </button>
//                     </div>
//                 </form>
//             </section>
//         </main>
//     );
// }

import React, { useState } from "react";
import "./CreateAddress.scss";
import { FaRegWindowClose, FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";

export default function CreateAddress({ handleCloseAddressModel, setShowModel, handleAddressSave }) {
  const [address, setAddress] = useState({
    flatNo: "",
    street: "",
    city: "",
    number: "",
    type: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch("/api/save-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });
      if (!response.ok) {
        throw new Error("Failed to save address");
      }
      setAddress({
        flatNo: "",
        street: "",
        city: "",
        number: "",
        type: "",
      });
      setSuccessMessage("Address saved successfully.");
      handleAddressSave(); // Refresh addresses after saving
      setShowModel(false);
    } catch (error) {
      setErrorMessage("Error saving address. Please try again.");
      console.error("Error saving address:", error.message);
    }
  };

  return (
    <main className="create_address_wrapper">
      <span className="close_Address_model" onClick={handleCloseAddressModel}>
        <FaRegWindowClose className="close_Address_model_icon" />
      </span>
      <section className="create_address_section">
        <h2>Save Address</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="flatNo"
            placeholder="Flat No"
            value={address.flatNo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={address.street}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="number"
            placeholder="Contact Number"
            value={address.number}
            onChange={handleChange}
            required
          />

          <div className="create_address_type">
            <label>
              <input
                type="radio"
                name="type"
                value="Home"
                checked={address.type === "Home"}
                onChange={handleChange}
              />
              <FaHome className="create_address_type_icon" />
            </label>

            <label>
              <input
                type="radio"
                name="type"
                value="Work"
                checked={address.type === "Work"}
                onChange={handleChange}
              />
              <MdOutlineWorkOutline className="create_address_type_icon" />
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="Other"
                checked={address.type === "Other"}
                onChange={handleChange}
              />
              <FaMapMarkerAlt className="create_address_type_icon" />
            </label>
          </div>

          <div className="create_address_submit_btn">
            <button type="submit">Save Address</button>
          </div>
        </form>
      </section>
    </main>
  );
}
