import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const [tableId, setTableId] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [requestedAmenities, setRequestedAmenities] = useState([]);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const amenitiesOptions = ["WIFI", "AC", "MUSIC"];
  const statusOptions = ["PENDING", "CONFIRMED", "CANCELLED"];

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString || userString === "undefined") {
        localStorage.clear();
        navigate("/login");
        return;
      }
      const user = JSON.parse(userString);
      if (!user?.id) throw new Error("User ID missing");
      setUserId(user.id);
    } catch (err) {
      console.error("User Error:", err);
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  const handleAmenityChange = (amenity) => {
    setRequestedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!status) {
      alert("Please select booking status.");
      return;
    }

    const bookingData = {
      userId,
      tableId: parseInt(tableId),
      bookingTime,
      numberOfGuests,
      requestedAmenities,
      status,
    };

    try {
      await axios.post("/bookings", bookingData);
      setMessage("✅ Booking successful!");
      setTableId("");
      setBookingTime("");
      setNumberOfGuests(1);
      setRequestedAmenities([]);
      setStatus("");
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("❌ Booking failed. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📅 Book a Table</h2>
      {message && (
        <p
          style={{
            ...styles.message,
            color: message.includes("successful") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Table ID */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Table ID:</label>
          <input
            type="number"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Booking Time */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Booking Time:</label>
          <input
            type="datetime-local"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Number of Guests */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Number of Guests:</label>
          <input
            type="number"
            min="1"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Amenities */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Amenities:</label>
          <div style={styles.checkboxGroup}>
            {amenitiesOptions.map((amenity) => (
              <label key={amenity} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={requestedAmenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        {/* Status */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">-- Select Status --</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={styles.button}>
          ✅ Book Table
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#fdfdfd",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#3f51b5",
  },
  message: {
    textAlign: "center",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.3rem",
    fontWeight: "bold",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  checkboxGroup: {
    display: "flex",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  checkboxLabel: {
    fontWeight: "normal",
  },
  button: {
    backgroundColor: "#3f51b5",
    color: "white",
    padding: "0.75rem",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

export default BookingForm;
