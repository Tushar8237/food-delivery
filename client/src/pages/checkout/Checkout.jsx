import React, { useState } from "react";
import "./Checkout.scss";
import item from "../../assets/restaurants/paneer-tikka.png";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "../../redux/cart-items/cartSlice";
import Address from "./address/Address";
import EmptyCart from "./empty-cart/EmptyCart";
import { useNavigate } from "react-router-dom";
export default function Checkout() {
    const [selectAddress, setSelectAddress] = useState({})
    const { cart } = useSelector((state) => state.cart);
    const { restro } = useSelector((state) => state.restro);
    const { currentUser } = useSelector((state) => state.user)
    const { address } = useSelector((state) => state.address)
    const [order, setOrder] = useState([])

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const deliveryFee = 47;
    const platFormFee = 3;

    const total = totalPrice + deliveryFee + platFormFee;

    const menuId = cart?.map((item) => item._id);
    const restaurantWithMenu = restro?.restros?.find((restaurant) =>
        restaurant.menu.some((menuItem) => menuItem._id === menuId[0])
    );

    const { username, ...rest} = currentUser
    const { _id, ...restData } = restaurantWithMenu ? restaurantWithMenu : 1
    
    const handleSubmitOrder = async () => {
        try {
            // order data
            const orderData = {
                username: username,
                address: selectAddress,
                cartItems: cart,
                restaurantId: _id
            }
            // make a post request
            const response = await fetch('/api/create-order', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })

            if(!response.ok){
                throw new Error("Failed to submit order")
            }

            const data = await response.json()
            if(response.ok){
                setOrder(data)
                dispatch(clearCart())
                navigate("/order-success")
            }
        } catch (error) {
            console.error("failed to place order please try again later")
        }
    }
    
    return (
        <main className="checkout_wrapper">
            {cart.length ? (
                <section className="checkout_section">
                    <div className="checkout_left">
                        <div className="checkout_leftTop">
                            <div className="checkout_leftRestro">
                                <div>
                                    <img
                                        src={
                                            restaurantWithMenu && restaurantWithMenu.image 
                                                ? restaurantWithMenu.image
                                                : item
                                        }
                                        alt="Restaurant Image"
                                    />
                                </div>
                                <div>
                                    <h3>
                                        {restaurantWithMenu && restaurantWithMenu.name
                                            ? restaurantWithMenu.name
                                            : ""}
                                    </h3>
                                    <span>
                                        {restaurantWithMenu && restaurantWithMenu.street
                                            ? restaurantWithMenu.street
                                            : ""}
                                    </span>
                                </div>
                            </div>

                            {cart.map((item) => (
                                <div className="checkout_leftItems" key={item._id}>
                                    <div className="checkout_leftItemsLeft">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg"
                                            alt="veg icon"
                                        />
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="checkout_leftItemsRight">
                                        <div>
                                            <span onClick={() => dispatch(removeFromCart(item))}>
                                                -
                                            </span>
                                            <strong>{item.quantity}</strong>
                                            <span onClick={() => dispatch(addToCart(item))}>+</span>
                                        </div>
                                        <p>Rs{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="checkout_leftBill">
                                <p className="checkout_leftBillDetails">Bill Details</p>
                                <div>
                                    <p>Item Total</p>
                                    <span>Rs{totalPrice}</span>
                                </div>
                                <div>
                                    <p>Delivery Fee | 4.4 kms</p>
                                    <span>Rs{deliveryFee}</span>
                                </div>
                                <div>
                                    <p>Platform fee</p>
                                    <span>{platFormFee}</span>
                                </div>
                            </div>
                            <div className="checkout_leftTotal">
                                <span>TOPAY</span>
                                <span>Rs {total}</span>
                            </div>
                        </div>
                    </div>
                    <Address setSelectAddress={setSelectAddress} handleSubmitOrder={handleSubmitOrder}/> 
                </section>
            ) : (
                <EmptyCart />
            )}
        </main>
    );
}
