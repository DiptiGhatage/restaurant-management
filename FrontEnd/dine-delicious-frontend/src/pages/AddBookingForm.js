import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const AddBookingForm = () => {
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [requestedAmenities, setRequestedAmenities] = useState([]);
  const [status, setStatus] = useState('PENDING');
  const [message, setMessage] = useState('');

  // Get current logged in userId from localStorage
  const userId = localStorage.getItem('userId');

  const amenitiesList = ['WIFI', 'AC', 'PROJECTOR', 'MUSIC'];

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axiosInstance.get('/menu/restaurantTables'); // backend path
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching tables', error);
      }
    };

    fetchTables();
  }, []);

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRequestedAmenities([...requestedAmenities, value]);
    } else {
      setRequestedAmenities(requestedAmenities.filter((a) => a !== value));
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        userId: parseInt(userId),
        tableId: parseInt(tableId),
        bookingTime,
        numberOfGuests: parseInt(numberOfGuests),
        requestedAmenities,
        status
      };

      const res = await axiosInstance.post('/booking', requestBody);
      setMessage('Booking created successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Error creating booking: ' + err.response?.data?.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create New Booking</h2>
      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}

      <form onSubmit={handleBookingSubmit}>

        <div>
          <label>Table:</label>
          <select value={tableId} onChange={(e) => setTableId(e.target.value)} required>
            <option value="">-- Select Table --</option>
            {tables.map((table) => (
              <option key={table.id} value={table.id}>
                Table {table.tableNumber} (ID: {table.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Booking Time:</label>
          <input
            type="datetime-local"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Number of Guests:</label>
          <input
            type="number"
            min="1"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div>
          <label>Amenities:</label><br />
          {amenitiesList.map((amenity) => (
            <label key={amenity}>
              <input
                type="checkbox"
                value={amenity}
                onChange={handleAmenityChange}
              />
              {amenity}
            </label>
          ))}
        </div>

        <button type="submit">Book Table</button>
      </form>
    </div>
  );
};

export default AddBookingForm;
