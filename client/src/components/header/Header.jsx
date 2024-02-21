import React, { useEffect, useState } from "react";
import "./Header.scss";
import coverImg from "../../assets/cover-img.png";
import { getIconPath, IconName } from "../../utils/getIconPath";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [popUp, setPopUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setPopUp(false); // Hide the popup whenever currentUser changes
  }, [location]);

  const handlePopUp = () => {
    if (currentUser) {
      setPopUp(!popUp);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("api/auth/signout");
      dispatch(signOut());
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="header_wrapper">
      <img src={coverImg} alt="cover" className="header_cover" />
      <section className="header_section">
        <div className="header_topSection">
     
            <Link to="/" className="header_logo">
              <h2 variant="body1" color="white" fontWeight="bold">
                fooD deliverY
              </h2>
            </Link>
         

          {currentUser ? (
            <div className="header_right">
              <Link className="header_add_restro">
                <p>Add Restaurant</p>
              </Link>
              <img
                src={
                  currentUser.profilePicture
                    ? currentUser.profilePicture
                    : getIconPath(IconName.AVATAR)
                }
                alt="User Name"
                className="header_userIcon"
                onClick={handlePopUp}
              />
            </div>
          ) : (
            <Link to="/sign-in" className="header_signin">
              <p>Sign in</p>
            </Link>
          )}
        </div>

        <div div className="header_bottomSection">
          <h2>FOOD</h2>
          <p>Discover the best food & drinks in Nagpur</p>
          <div>
            <div className="header_bottomLeft">
              <img src={getIconPath(IconName.MAP)} alt="" />
              <input type="text" placeholder="Civil Lines, Nagpur" />
            </div>
            <div className="header_bottomRight">
              <img
                src={getIconPath(IconName.SEARCH)}
                alt=""
                className="header_searchBarIcon"
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="Search for the restaurant, cuisine or a dish"
              />
            </div>
          </div>
        </div>
        {popUp && currentUser && (
          <div className="header_popUp">
            <Link to="/profile" className="header_profile">
              <p>Profile</p>
            </Link>
            <Link to="/my-restaurant" className="header_profile">
              <p>My Restaurant</p>
            </Link>
            <button onClick={handleSignOut}>Log Out</button>
          </div>
        )}
      </section>
    </main>
  );
}
