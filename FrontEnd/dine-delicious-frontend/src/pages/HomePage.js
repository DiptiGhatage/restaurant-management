import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <img
          src="/image/dine-logo.png"
          alt="Dine Delicious Logo"
          className="home-logo"
        />
        <h1>Welcome to Dine Delicious</h1>
        <p>Experience the best food from the best chefs</p>
        <div className="home-buttons">
          <Link to="/menu" className="btn">
            View Menu
          </Link>
          <Link to="/booking" className="btn">
            Book a Table
          </Link>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
