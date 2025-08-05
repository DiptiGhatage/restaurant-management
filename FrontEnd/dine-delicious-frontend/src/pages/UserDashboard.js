import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Dashboard</h2>
      <p>Welcome, you are logged in as <strong>USER</strong>.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <button onClick={() => handleNavigate('/booking')}>Book a Table</button>
        <button onClick={() => handleNavigate('/order')}>Place an Order</button>
        <button onClick={() => handleNavigate('/payment')}>Make Payment</button>
        <button onClick={() => handleNavigate('/menu')}>View Menu</button>
      </div>
    </div>
  );
};

export default UserDashboard;

