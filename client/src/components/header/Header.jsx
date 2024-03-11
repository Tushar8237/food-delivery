import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDataClear, signOut } from "../../redux/user/userSlice";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import SearchItem from "./search-items/SearchItem";
import { clearCart } from "../../redux/cart-items/cartSlice";

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [popUp, setPopUp] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestion] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = useSelector((state) => state.user);


    useEffect(() => {
        setPopUp(false);
        setSuggestion([]);
    }, [location, currentUser, setSuggestion]);
    
    const handlePopUp = () => {
        if (currentUser) {
            setPopUp(!popUp);
        }
    };

    const { _id, ...rest} = currentUser || {}

    // sing out
    const handleSignOut = async () => {
        try {
            await fetch("api/auth/signout");
            dispatch(signOut());
            dispatch(clearCart());
            dispatch(getUserDataClear())
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        const search = async () => {
            try {
                if (query.trim() !== "") {
                    // If the query is not empty, send a request to the backend
                    const response = await fetch(
                        `/api/restaurant/search?q=${encodeURIComponent(query)}`
                    );
                    const data = await response.json();
                    setSuggestion(data); // Update the suggestion state with the data received from the backend
                } else {
                    // If the query is empty, clear the suggestion state
                    setSuggestion([]);
                }
            } catch (error) {
                console.log(error); // Log any errors that occur during the search process
            }
        };
        // Call the search function immediately when the component mounts or when the query state changes
        search();
    }, [query]); // The dependency array ensures that this effect runs whenever the 'query' state changes


    
    return (
        <>
            <main className="header_wrapper">
                <section className="header_section">
                    <div className="header_topSection">
                        <Link to="/" className="header_logo">
                            <h2>fooD deliverY</h2>
                            <h2 className="header_log_title">FOOD</h2>
                        </Link>

                        {location.pathname === "/" ? (
                            <div className="header_bottomSection">
                                <div>
                                    <div className="header_bottomRight">
                                        <CiSearch className="header_searchBarIcon" />
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Search for the restaurant, cuisine or a dish"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {currentUser ? (
                            <div className="header_right">
                                <img
                                    src={
                                        currentUser.profilePicture ? (
                                            currentUser.profilePicture
                                        ) : (
                                            <FaRegCircleUser />
                                        )
                                    }
                                    alt="User Name"
                                    className="header_userIcon"
                                    onClick={handlePopUp}
                                />
                                <p
                                    style={{
                                        color: "rgb(97, 95, 95)",
                                        fontFamily: "poppins",
                                        fontWeight: "500",
                                        textTransform: "capitalize",
                                        cursor: "pointer",
                                    }}
                                    onClick={handlePopUp}
                                >
                                    {currentUser.username.substring(0, 6)}
                                </p>
                            </div>
                        ) : (
                            <Link to="/sign-in" className="header_signin">
                                <p>Sign in</p>
                            </Link>
                        )}
                    </div>

                    {popUp && currentUser && (
                        <div className="header_popUp">
                            <Link to="/profile" className="header_profile">
                                <p>Profile</p>
                            </Link>
                            <div className="mobile_add_restro">
                                {currentUser?.restaurant?.length >= 1 ? (
                                    ""
                                ) : (
                                    <Link to="add-restaurant" className="header_add_restro">
                                        <p>Add Restaurant</p>
                                    </Link>
                                )}
                            </div>
                            {userData?.user?.restaurant?.length || userData?.restaurant?.length ? (
                                <Link to="/my-restaurant" className="header_profile">
                                    <p>My Restaurant</p>
                                </Link>
                            ) : (
                                <Link to="add-restaurant" className="header_profile">
                                    <p>Add Restaurant</p>
                                </Link>
                            )}
                            <button onClick={handleSignOut}>Log Out</button>
                        </div>
                    )}
                </section>
            </main>
            {location.pathname === "/" ? (
                <SearchItem suggestions={suggestions.item} />
            ) : (
                ""
            )}
        </>
    );
}
