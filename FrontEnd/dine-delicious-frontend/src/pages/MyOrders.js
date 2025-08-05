import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/order/my-orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error("Failed to load orders", err));
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">🧾 My Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Table</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.tableId}</td>
                <td>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.id}>
                        {item.menuItemName} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.totalPrice}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
