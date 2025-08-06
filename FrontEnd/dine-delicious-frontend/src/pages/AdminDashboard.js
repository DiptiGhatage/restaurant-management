import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Unauthorized!");
      navigate("/unauthorized");
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.role !== "ADMIN") {
      alert("Unauthorized!");
      navigate("/unauthorized");
      return;
    }

    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/bookings/${id}/status`, { status });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">Welcome, Admin!</h2>
        <p className="mb-6 text-gray-600 text-lg">This is your admin dashboard.</p>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 All Bookings</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-indigo-100 text-gray-800 text-sm uppercase">
                  <th className="p-3 border">Booking ID</th>
                  <th className="p-3 border">User ID</th>
                  <th className="p-3 border">Table ID</th>
                  <th className="p-3 border">Guests</th>
                  <th className="p-3 border">Time</th>
                  <th className="p-3 border">Amenities</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="text-center hover:bg-gray-50">
                    <td className="p-3 border">{b.id}</td>
                    <td className="p-3 border">{b.userId}</td>
                    <td className="p-3 border">{b.tableId}</td>
                    <td className="p-3 border">{b.numberOfGuests}</td>
                    <td className="p-3 border">{b.bookingTime}</td>
                    <td className="p-3 border">{b.requestedAmenities?.join(", ")}</td>
                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 text-xs font-bold rounded-full ${
                          b.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : b.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 border space-x-2">
                      {b.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => updateStatus(b.id, "APPROVED")}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(b.id, "REJECTED")}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
