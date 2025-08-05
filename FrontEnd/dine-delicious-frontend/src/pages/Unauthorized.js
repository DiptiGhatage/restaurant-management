import React from 'react';

const Unauthorized = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
      <h2>⚠️ Access Denied</h2>
      <p>You are not authorized to view this page.</p>
    </div>
  );
};

export default Unauthorized;
