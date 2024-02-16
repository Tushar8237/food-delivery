import React from "react";
import './Home.scss'
import Banner from "../components/banner/Banner";
import Restaurants from "./restaurants/Restaurants";

export default function Home() {
  return (
    <main className="home_wrapper">
      <section className="home_section">
        <Banner />
        <Restaurants />
      </section>
    </main>
  );
}
