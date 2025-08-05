import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('/api/menu'); // no auth needed for public view
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🍽️ Restaurant Menu</h2>
      {menuItems.length === 0 ? (
        <p>No menu items found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Price</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>₹{item.price}</td>
                <td>{item.available ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MenuList;
