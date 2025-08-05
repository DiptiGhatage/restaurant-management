import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

function OrderForm() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [tableId, setTableId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get('/api/menu');
      setMenuItems(res.data);
    } catch (err) {
      console.error('Failed to load menu', err);
    }
  };

  const handleQuantityChange = (menuItemId, quantity) => {
    setSelectedItems(prev => ({
      ...prev,
      [menuItemId]: quantity,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const items = Object.entries(selectedItems)
      .filter(([id, qty]) => qty > 0)
      .map(([menuItemId, quantity]) => ({ menuItemId, quantity }));

    if (items.length === 0 || !tableId) {
      alert('Select at least one item and provide table ID.');
      return;
    }

    try {
      await axios.post('/api/order', {
        tableId,
        items,
      });

      alert('Order placed successfully!');
      navigate('/my-orders');
    } catch (err) {
      console.error('Order failed', err);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">🛒 Place Your Order</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Table ID:</label>
          <input
            type="text"
            className="form-control"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            placeholder="Enter your table ID"
            required
          />
        </div>

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Menu Item</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>₹{item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    value={selectedItems[item.id] || ''}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value) || 0)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-4">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
