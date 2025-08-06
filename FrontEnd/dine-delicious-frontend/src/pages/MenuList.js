import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/menu-items');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError('Failed to load menu items.');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">🍽️ Menu</h2>

      {loading && (
        <p className="text-center text-blue-600 font-medium">Loading menu...</p>
      )}

      {error && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}

      {!loading && !error && (
        menuItems.length === 0 ? (
          <p className="text-center text-gray-500">No menu items found.</p>
        ) : (
          <table className="w-full border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="p-3 border-b border-gray-300 text-left">Item</th>
                <th className="p-3 border-b border-gray-300 text-left">Description</th>
                <th className="p-3 border-b border-gray-300 text-right">Price (₹)</th>
                <th className="p-3 border-b border-gray-300 text-center">Available</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-3 border-b border-gray-300 font-semibold">{item.name}</td>
                  <td className="p-3 border-b border-gray-300">{item.description}</td>
                  <td className="p-3 border-b border-gray-300 text-right font-medium">₹{item.price}</td>
                  <td className="p-3 border-b border-gray-300 text-center">
                    {item.available ? 'Yes' : ' No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default MenuList;
