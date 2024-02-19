import React from "react";
import "./Header.scss";
import coverImg from "../../assets/cover-img.png";
import { getIconPath, IconName } from "../../utils/getIconPath";
import { Link } from "react-router-dom";

export default function Header() {
  let currentUser = true;
  return (
    <main className="header_wrapper">
      <img src={coverImg} alt="cover" className="header_cover" />
      <section className="header_section">
        <div className="header_topSection">
          <Link to='/' className="header_logo">
            <h2 variant="body1" color="white" fontWeight="bold">
              fooD deliverY
            </h2>
          </Link>
          {currentUser ? (
            <img
              src={getIconPath(IconName.AVATAR)}
              alt="User Name"
              className="header_userIcon"
            />
          ) : (
            <p>Sign In</p>
          )}
        </div>

        <div div className="header_bottomSection">
          <h2>F😋😋D</h2>
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
      </section>
    </main>
  );
}
