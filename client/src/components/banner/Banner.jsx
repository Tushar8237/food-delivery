import React from "react";
import banner from "../../assets/banner/banner-1.png";

export default function Banner() {
  return (
    <div
      style={{
        width: "100%",
        marginTop: "1rem"
      }}
    >
      <img
        src={banner}
        alt="banner img"
        style={{
          width: "100%",
        }}
      />
    </div>
  );
}
