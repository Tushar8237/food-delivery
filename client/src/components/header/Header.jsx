import React, { useEffect, useState } from "react";
import "./Header.scss";
import coverImg from "../../assets/cover-img.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";
import { CiSearch } from "react-icons/ci";
import { RiMapPinRangeLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [popUp, setPopUp] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestion] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setPopUp(false); // Hide the popup whenever currentUser changes
    }, [location, currentUser]);

    const handlePopUp = () => {
        if (currentUser) {
            setPopUp(!popUp);
        }
    };

    // sing out
    const handleSignOut = async () => {
        try {
            await fetch("api/auth/signout");
            dispatch(signOut());
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

    // console.log(query)
    // console.log(suggestions)

    return (
        <main className="header_wrapper">
            <img src={coverImg} alt="cover" className="header_cover" />
            <section className="header_section">
                <div className="header_topSection">
                    <Link to="/" className="header_logo">
                        <h2>fooD deliverY</h2>
                    </Link>

                    {currentUser ? (
                        <div className="header_right">
                            {currentUser?.restaurant?.length >= 1 ? (
                               ""
                            ) : (
                                <Link to="add-restaurant" className="header_add_restro">
                                    <p>Add Restaurant</p>
                                </Link>
                            )}
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
                            <p style={{
                                color: "white",
                                fontFamily: "poppins",
                                fontWeight: "500",
                                textTransform: "capitalize",
                                cursor: "pointer"
                            }}
                            onClick={handlePopUp}
                            >
                                {currentUser.username}
                            </p>
                        </div>
                    ) : (
                        <Link to="/sign-in" className="header_signin">
                            <p>Sign in</p>
                        </Link>
                    )}
                </div>

                <div className="header_bottomSection">
                    <h2>FOOD</h2>
                    <p>Discover the best food & drinks in Nagpur</p>
                    <div>
                        <div className="header_bottomLeft">
                            {/* <img src={getIconPath(IconName.MAP)} alt="" /> */}
                            <RiMapPinRangeLine className="header_map_icon" />
                            <input type="text" placeholder="Civil Lines, Nagpur" />
                        </div>
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
                {popUp && currentUser && (
                    <div className="header_popUp">
                        <Link to="/profile" className="header_profile">
                            <p>Profile</p>
                        </Link>
                        {currentUser.restaurant.length ? (
                            <Link to="/my-restaurant" className="header_profile">
                                <p>My Restaurant</p>
                            </Link>
                        ) : (
                            ""
                        )}
                        <button onClick={handleSignOut}>Log Out</button>
                    </div>
                )}
            </section>
        </main>
    );
}
