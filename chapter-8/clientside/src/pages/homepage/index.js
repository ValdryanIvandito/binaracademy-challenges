import React, { useState } from "react";
import logo from '../../assets/images/logo.svg';
import '../../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <img src={logo} className="HomePage-logo" alt="logo" />
        <p>
          Edit <code>src/HomePage.js</code> and save to reload.
        </p>
        <a
          className="HomePage-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default HomePage;