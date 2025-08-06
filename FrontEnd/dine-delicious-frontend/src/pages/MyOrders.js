import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/orders/my-orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error("Failed to load orders", err));
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">🧾 My Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Order #</th>
              <th>Table</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Placed At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.tableId}</td>
                <td>
                  <ul className="mb-0">
                    {order.items.map(item => (
                      <li key={item.id}>
                        {item.menuItemName} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.totalAmount}</td> {/* <-- इथे बदल */}
                <td>
                  <span className={`badge text-bg-${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'PLACED':
      return 'primary';
    case 'PREPARING':
      return 'warning';
    case 'SERVED':
      return 'info';
    case 'COMPLETED':
      return 'success';
    case 'CANCELLED':
      return 'danger';
    default:
      return 'secondary';
  }
};

export default MyOrders;
