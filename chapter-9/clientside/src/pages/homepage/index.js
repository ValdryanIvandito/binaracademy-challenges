import React, { useEffect } from "react";
import '../../styles/HomePage.css';
import Features from './feature'
import Footer from "../components/footer";
import Landing from "./landing";

const HomePage = () => {
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }, []);

  return (
    <div>
      <Landing />
      <Features />
      <Footer />
    </div>
  );
}

export default HomePage;