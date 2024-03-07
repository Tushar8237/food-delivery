import React, { useEffect, useState } from "react";
import "./Address.scss";
import CreateAddress from "../../../components/create-address/CreateAddress";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineWorkOutline, MdDelete } from "react-icons/md";

export default function Address({ setSelectAddress }) {
    const [showModel, setShowModel] = useState(false);
    const [addData, setAddData] = useState([]);
    const [onSelectedAddress, setOnSelectedAddress] = useState(null);

    const handleAddAddress = () => {
        setShowModel(true);
    };

    const handleCloseAddressModel = () => {
        setShowModel(false);
    }; 

    const getAddress = async () => {
        try {
            const response = await fetch("/api/all-address/");
            if (!response.ok) {
                throw new Error("Failed to fetch addresses");
            }
            const data = await response.json();
            setAddData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAddress();
    }, [addData]); // Removed getAddress from the dependency array, it causes infinite loops

    const handleAddressDelete = async (id) => {
        try {
            const response = await fetch(`/api/delete-address/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete address");
            }
            // Filter out the deleted address from the local state
            const updatedAddresses = addData.filter((address) => address._id !== id);
            // Update the state with the new array of addresses
            setAddData(updatedAddresses);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAddress();
    }, []); // Moved getAddress outside of this effect, removed handleAddressDelete dependency

    const handleSelectAddress = (address) => {
        // Pass selected address to parent component
        setSelectAddress(address);
        setOnSelectedAddress(address);
    };

    useEffect(() => {
        if (addData.addresses?.length === 1) {
            // If there's only one address, set it as the selected address
            setOnSelectedAddress(addData.addresses[0]);
        }
    }, [addData.addresses]); // Add addData.addresses as dependency

    return (
        <div className="checkout_right">
            <div className="checkout_rightTop">
                <div className="checkout_rightDelivery">
                    <h3>Delivery address</h3>
                    <span
                        style={{
                            color: "#fc8019",
                            cursor: "pointer",
                        }}
                        onClick={handleAddAddress}
                    >
                        Add New Address
                    </span>

                    {showModel ? (
                        <CreateAddress
                            setShowModel={setShowModel}
                            handleCloseAddressModel={handleCloseAddressModel}
                        />
                    ) : (
                        ""
                    )}
                </div>
                <div className="checkout_address_wrapper">
                    {addData.addresses?.map((address) => (
                        <div
                            className={`checkout_rightAddress ${onSelectedAddress &&
                                onSelectedAddress._id === address._id &&
                                "selected"
                                }`}
                            key={address._id}
                            onClick={() => handleSelectAddress(address)}
                        >
                            <span
                                className="checkout_address_delete"
                                onClick={() => handleAddressDelete(address._id)}
                            >
                                <MdDelete className="checkout_address_type_icon" />
                            </span>
                            {address.type === "Home" ? (
                                <h3>
                                    <FaHome className="checkout_address_type_icon" />{" "}
                                    {address.type}
                                </h3>
                            ) : (
                                ""
                            )}
                            {address.type === "Work" ? (
                                <h3>
                                    <MdOutlineWorkOutline className="checkout_address_type_icon" />{" "}
                                    {address.type}
                                </h3>
                            ) : (
                                ""
                            )}
                            {address.type === "Other" ? (
                                <h3>
                                    {" "}
                                    <FaMapMarkerAlt className="checkout_address_type_icon" />{" "}
                                    {address.type}
                                </h3>
                            ) : (
                                ""
                            )}
                            <p>{address.flatNo}</p>
                            <p>{address.street}</p>
                            <p>{address.city}</p>
                            <span>25 MINS</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="checkout_rightBottom">
                <h3>Choose payment method</h3>
                <div>
                    <span>PROCEED TO PAY</span>
                </div>
            </div>
        </div>
    );
}

