import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const BookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  // इतर status नुसार add करू शकतो
};

const MyAllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    tableId: '',
    bookingTime: '',
    numberOfGuests: '',
    requestedAmenities: ''
  });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get('/bookings');
      setBookings(res.data);
      setError('');
    } catch (err) {
      setError('Could not fetch bookings');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddOrUpdate = async () => {
    try {
      const payload = {
        tableId: formData.tableId,
        bookingTime: formData.bookingTime,
        numberOfGuests: parseInt(formData.numberOfGuests),
        requestedAmenities: formData.requestedAmenities.split(',').map(a => a.trim()),
        userId: JSON.parse(localStorage.getItem('user'))?.id || 1,
        status: 'PENDING'
      };

      if (editing) {
        await axiosInstance.put(`/bookings/${formData.id}`, payload);
        alert('Booking updated!');
      } else {
        await axiosInstance.post('/bookings', payload);
        alert('Booking created!');
      }

      setFormData({ id: null, tableId: '', bookingTime: '', numberOfGuests: '', requestedAmenities: '' });
      setEditing(false);
      fetchBookings();
    } catch (err) {
      alert('Error saving booking');
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axiosInstance.delete(`/bookings/${id}`);
      alert('Booking cancelled!');
      fetchBookings();
    } catch (err) {
      alert('Failed to cancel booking');
    }
  };

  const editBooking = (booking) => {
    setFormData({
      id: booking.id,
      tableId: booking.tableId,
      bookingTime: booking.bookingTime,
      numberOfGuests: booking.numberOfGuests,
      requestedAmenities: booking.requestedAmenities.join(', ')
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter ? b.status === statusFilter : true;
    const matchesDate = dateFilter ? b.bookingTime.startsWith(dateFilter) : true;
    return matchesStatus && matchesDate;
  });

  return (
    <div style={{ padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>{editing ? '✏️ Update Booking' : '➕ Add New Booking'}</h2>

      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <input
            type="number"
            name="tableId"
            placeholder="Table ID"
            value={formData.tableId}
            onChange={handleFormChange}
            style={inputStyle}
          />
          <input
            type="datetime-local"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleFormChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="numberOfGuests"
            placeholder="Guests"
            value={formData.numberOfGuests}
            onChange={handleFormChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="requestedAmenities"
            placeholder="Amenities (comma separated)"
            value={formData.requestedAmenities}
            onChange={handleFormChange}
            style={inputStyle}
          />

          {/* Status dropdown add here */}
          <select
            name="status"
            value={formData.status || ''}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, status: e.target.value }))
            }
            style={inputStyle}
          >
            <option value="">Select Status</option>
            {Object.entries(BookingStatus).map(([key, value]) => (
              <option key={key} value={value}>{value}</option>
            ))}
          </select>

          <button onClick={handleAddOrUpdate} style={editing ? updateBtn : addBtn}>
            {editing ? 'Update Booking' : 'Add Booking'}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#444' }}>📋 My Booking History</h3>
        <label>Status: </label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={selectStyle}>
          <option value="">All</option>
          {Object.entries(BookingStatus).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>

        <label style={{ marginLeft: '20px' }}>Date: </label>
        <input type="date" onChange={(e) => setDateFilter(e.target.value)} style={inputStyle} />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {filteredBookings.map((b) => (
        <div
          key={b.id}
          style={{
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}
        >
          <h4 style={{ marginBottom: '10px' }}>📄 Booking #{b.id}</h4>
          <p><strong>Table ID:</strong> {b.tableId}</p>
          <p><strong>Table Number:</strong> {b.tableNumber}</p>
          <p><strong>Booked By:</strong> {b.userName}</p>
          <p><strong>Booking Time:</strong> {b.bookingTime}</p>
          <p><strong>Status:</strong> {b.status}</p>
          <p><strong>Guests:</strong> {b.numberOfGuests}</p>
          <p><strong>Amenities:</strong> {b.requestedAmenities?.join(', ') || 'None'}</p>

          {b.status !== 'CANCELLED' && (
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => cancelBooking(b.id)} style={cancelBtn}>Cancel</button>
              <button onClick={() => editBooking(b)} style={editBtn}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  minWidth: '200px'
};

const selectStyle = {
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginLeft: '5px'
};

const addBtn = {
  padding: '10px 15px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const updateBtn = {
  ...addBtn,
  backgroundColor: '#007bff'
};

const cancelBtn = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '5px',
  marginRight: '10px',
  cursor: 'pointer'
};

const editBtn = {
  backgroundColor: 'orange',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default MyAllBookings;
