import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './routes/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import MenuList from './pages/MenuList';
import BookingForm from './pages/BookingForm';
import OrderForm from './pages/OrderForm';
import PaymentForm from './pages/PaymentForm';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard'; // जर तयार नसेल तर तयार करून देतो
import Navbar from './components/Navbar';
import Unauthorized from './pages/Unauthorized'; // correct path दे
import MyOrders from './pages/MyOrders'; 
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Shared Route (Menu view - both roles) */}
          <Route path="/menu" element={<MenuList />} />

          {/* ADMIN Routes */}
          <Route
            path="/admin/menu"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <MenuList/>
              </ProtectedRoute>
            }
          />
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
            path="/unauthorized" 
             element={
             <Unauthorized />
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
             <MyOrders />
            } 
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute allowedRoles={['USER']}>
                <PaymentForm/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
