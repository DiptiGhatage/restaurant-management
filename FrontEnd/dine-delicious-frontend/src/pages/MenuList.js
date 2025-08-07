import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [groupedItems, setGroupedItems] = useState({});
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
      groupByCategory(response.data);
    } catch (err) {
      console.error('Error fetching menu items:', err);
      setError('Failed to load menu items.');
    }
    setLoading(false);
  };

  const groupByCategory = (items) => {
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    setGroupedItems(grouped);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-10 text-orange-700">🍽️ Our Menu</h2>

      {loading && <p className="text-center text-blue-600 font-medium">Loading menu...</p>}
      {error && <p className="text-center text-red-600 font-semibold">{error}</p>}

      {!loading && !error && Object.keys(groupedItems).length === 0 && (
        <p className="text-center text-gray-500">No menu items found.</p>
      )}

      {!loading && !error && (
        <div className="max-w-6xl mx-auto space-y-12">
          {Object.keys(groupedItems).map(category => (
            <div key={category}>
              <h3 className="text-2xl font-bold mb-6 text-orange-800 border-b-2 border-orange-300 inline-block uppercase">
                {category.replace("_", " ")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {groupedItems[category].map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-xl transition duration-300"
                  >
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h4>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <p className="text-lg font-bold text-green-700 mb-1">₹{item.price}</p>
                    <p className={`text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-500'}`}>
                      {item.available ? 'Available' : 'Not Available'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuList;
