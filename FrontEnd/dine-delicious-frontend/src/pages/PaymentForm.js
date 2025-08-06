import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const PaymentForm = () => {
  const [orderId, setOrderId] = useState("");
  const [mode, setMode] = useState("");  // PaymentMode: CASH, CARD, UPI, WALLET
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderId || !mode) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const payload = {
        orderId: parseInt(orderId),
        mode: mode
      };

      const response = await axiosInstance.post("/payments", payload);
      setMessage(`Payment successful! Payment ID: ${response.data.id}`);
      setOrderId("");
      setMode("");
    } catch (error) {
      console.error("Payment failed", error);
      setMessage("Payment failed. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Make a Payment</h2>
      {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Order ID:</label><br />
          <input
            type="number"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Payment Mode:</label><br />
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">-- Select Payment Mode --</option>
            <option value="CASH">Cash</option>
            <option value="CARD">Card</option>
            <option value="UPI">UPI</option>
            <option value="WALLET">Wallet</option>
          </select>
        </div>

        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
