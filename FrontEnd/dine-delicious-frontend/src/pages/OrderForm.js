import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const OrderForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [tableId, setTableId] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    axios.get('/menu')
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.error("Failed to load menu items", err));

    axios.get('/tables')
      .then((res) => setTables(res.data))
      .catch((err) => console.error("Failed to load tables", err));
  }, []);

  const addItem = (menuItem) => {
    const existing = selectedItems.find((i) => i.menuItemId === menuItem.id);
    if (existing) {
      setSelectedItems(selectedItems.map(i =>
        i.menuItemId === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setSelectedItems([...selectedItems, { menuItemId: menuItem.id, quantity: 1 }]);
    }
  };

  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("User not logged in");
      return;
    }

    const orderRequest = {
      userId: user.id,
      tableId,
      items: selectedItems  // ✅ Correct field name for backend
    };

    console.log("Sending Order:", orderRequest);

    try {
      await axios.post('/orders', orderRequest);
      alert('Order placed successfully');
      setSelectedItems([]);
      setTableId('');
    } catch (err) {
      console.error("Order failed", err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🧾 Place Your Order</h2>

      <div className="grid grid-cols-2 gap-4">
        {menuItems.map(item => (
          <div key={item.id} className="border rounded-xl p-3 shadow">
            <h3 className="font-semibold">{item.name}</h3>
            <p>{item.description}</p>
            <p className="text-green-600 font-bold">₹{item.price}</p>
            <button
              onClick={() => addItem(item)}
              className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
            >
              Add
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label className="block mb-2">Select Table:</label>
        <select
          className="border p-1 rounded w-full max-w-sm"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
        >
          <option value="">-- Select Table --</option>
          {tables.map(table => (
            <option key={table.id} value={table.id}>
              {table.tableNumber}
            </option>
          ))}
        </select>
      </div>

      {selectedItems.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold">🛒 Selected Items:</h4>
          <ul>
            {selectedItems.map((item, idx) => {
              const menuItem = menuItems.find(mi => mi.id === item.menuItemId);
              return (
                <li key={idx}>
                  {menuItem?.name} x {item.quantity}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button
        onClick={handleOrder}
        className="bg-green-600 text-white px-4 py-2 mt-6 rounded"
      >
        ✅ Place Order
      </button>
    </div>
  );
};

export default OrderForm;
