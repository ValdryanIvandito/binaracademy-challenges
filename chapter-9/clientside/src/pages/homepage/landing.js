import React from "react";
import "../../styles/HomePage.css";

import Navbar from "../components/navbar";
import Carouselcom from "../components/carousel";

export default function Landing() {
  return (
    <section>
      <div className="HomePage-img">
        <Navbar />
        <div className="content-container">
          <h1 className="welcome-text">Welcome to our game site!</h1>
          <div className="carousel-wrapper">
            <Carouselcom />
          </div>
        </div>
      </div>
    </section>
  );
}