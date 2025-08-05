import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '15px' }}>Home</Link>

      {/* Visible to all */}
      <Link to="/menu" style={{ marginRight: '15px' }}>Menu</Link>

      {/* If user is authenticated and role is USER */}
      {isAuthenticated && user?.role === 'USER' && (
        <>
          <Link to="/user/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
          <Link to="/booking" style={{ marginRight: '15px' }}>Book Table</Link>
          <Link to="/my-orders" style={{ marginRight: '15px' }}>My Orders</Link>
          <Link to="/payment" style={{ marginRight: '15px' }}>Make Payment</Link>
        </>
      )}

      {/* If user is ADMIN */}
      {isAuthenticated && user?.role === 'ADMIN' && (
        <>
          <Link to="/admin/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
          <Link to="/admin/menu" style={{ marginRight: '15px' }}>Manage Menu</Link>
        </>
      )}

      {/* Right side auth buttons */}
      <span style={{ float: 'right' }}>
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: '10px' }}>Hi, {user?.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </span>
    </nav>
  );
};

export default Navbar;
