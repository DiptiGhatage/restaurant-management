import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './routes/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import BookingForm from './pages/BookingForm';
import OrderForm from './pages/OrderForm';
import PaymentForm from './pages/PaymentForm';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Unauthorized from './pages/Unauthorized';
import MyOrders from './pages/MyOrders';
import MyBookings from './pages/MyBookings';
import MenuPageSelector from './pages/MenuPageSelector';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Role-Based Menu Route */}
          <Route
            path="/menu"
            element={
              <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
                <MenuPageSelector />
              </ProtectedRoute>
            }
          />

          {/* ADMIN Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* USER Routes */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute allowedRoles={['USER']}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute allowedRoles={['USER']}>
                <BookingForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute allowedRoles={['USER']}>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute allowedRoles={['USER']}>
                <OrderForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute allowedRoles={['USER']}>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute allowedRoles={['USER']}>
                <PaymentForm />
              </ProtectedRoute>
            }
          />

          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* 404 fallback */}
          <Route path="*" element={<h3>404 - Page Not Found</h3>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
