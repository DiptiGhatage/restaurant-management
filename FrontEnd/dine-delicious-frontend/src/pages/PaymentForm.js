import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [paymentMode, setPaymentMode] = useState('CASH');

  // 🛒 Fetch user's orders for payment
  useEffect(() => {
    axiosInstance.get('/order/user')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders', error));
  }, []);

  // 💳 Submit payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        orderId: selectedOrderId,
        paymentMode: paymentMode,
      };

      await axiosInstance.post('/payment', payload);
      alert(' Payment Successful!');
      navigate('/menu'); // or to payment success page
    } catch (error) {
      console.error('Payment failed:', error);
      alert(' Payment failed. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">💳 Make a Payment</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="form-group mb-3">
          <label>Select Order</label>
          <select
            className="form-control"
            value={selectedOrderId}
            onChange={(e) => setSelectedOrderId(e.target.value)}
            required
          >
            <option value="">-- Select an Order --</option>
            {orders.map(order => (
              <option key={order.id} value={order.id}>
                {order.orderNumber} - ₹{order.totalAmount}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Payment Mode</label>
          <select
            className="form-control"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            required
          >
            <option value="CASH">Cash</option>
            <option value="CARD">Card</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        <button className="btn btn-success w-100" type="submit">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
