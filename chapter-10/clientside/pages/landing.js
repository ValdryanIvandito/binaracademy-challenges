import React from "react";
import Navbar from "./components/navbar";
import Carouselcom from "./components/carousel";
import styles from "../styles/HomePage.module.css";

export default function Landing() {
  return (
    <section>
      <div className={styles.HomePageImage}>
        <Navbar />
        <div className={styles.contentContainer}>
          <h1 className={styles.welcomeText}>Welcome to our game site!</h1>
          <div className={styles.carouselWrapper}>
            <Carouselcom />
          </div>
        </div>
      </div>
    </section>
  );
}