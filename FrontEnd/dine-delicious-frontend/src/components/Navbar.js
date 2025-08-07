import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import './Navbar.css'; 

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/menu" className="nav-link">Menu</Link>

        {isAuthenticated && user?.role === 'USER' && (
          <>
            <Link to="/user/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/booking" className="nav-link">Book Table</Link>
            <Link to="/my-orders" className="nav-link">My Orders</Link>
            <Link to="/payment" className="nav-link">Make Payment</Link>
            <Link to="/my-bookings" className="nav-link">My Bookings</Link>
          </>
        )}

        {isAuthenticated && user?.role === 'ADMIN' && (
          <>
            <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/admin/menu" className="nav-link">Manage Menu</Link>
          </>
        )}
      </div>

      <div className="navbar-right">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        ) : (
          <>
            <span className="nav-user">Hi, {user?.username}</span>
            <button onClick={handleLogout} className="nav-logout">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
