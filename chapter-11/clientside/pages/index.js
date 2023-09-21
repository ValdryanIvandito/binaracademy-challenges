// import Head from 'next/head';
// import Image from 'next/image';
import React, { useEffect } from "react";
import Landing from "./landing";
import Features from './feature';
import Footer from "./components/footer";

function HomePage() {
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
  )
}

export default HomePage