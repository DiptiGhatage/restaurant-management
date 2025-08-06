
import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div 
      className="homepage-background"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/restaurant-bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="hero-content">
        <img
          src={`${process.env.PUBLIC_URL}/images/dine-logo.png`}
          alt="DineDelicious restaurant logo featuring a golden fork and spoon"
          className="homepage-logo"
        />
        <h1>Welcome to DineDelicious</h1>
        <p>Enjoy gourmet meals with a cozy ambiance</p>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: contact@dinedelicious.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Location: FC Road, Pune, Maharashtra</p>
      </div>
    </div>
  );
}

export default HomePage;
