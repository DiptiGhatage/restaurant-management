import React, { useState } from 'react';
import axios from '../utils/axiosInstance'; // Axios instance with token
import { useNavigate } from 'react-router-dom';

function BookingForm() {
  const [dateTime, setDateTime] = useState('');
  const [tableId, setTableId] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/booking', {
        bookingTime: dateTime,
        tableId,
        numberOfGuests,
      });
      setMessage('Booking successful!');
      setTimeout(() => navigate('/menu'), 1500);
    } catch (err) {
      console.error(err);
      setMessage('Booking failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4">
        <h3 className="mb-4 text-center">🪑 Book a Table</h3>

        <form onSubmit={handleBooking}>
          <div className="mb-3">
            <label className="form-label">Date & Time</label>
            <input
              type="datetime-local"
              className="form-control"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Table ID</label>
            <input
              type="number"
              className="form-control"
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Number of Guests</label>
            <input
              type="number"
              className="form-control"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              min={1}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Book Now
          </button>

          {message && (
            <div className="alert alert-info text-center mt-4">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
