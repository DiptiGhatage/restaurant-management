import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user role not in allowedRoles, redirect to unauthorized page
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized access - render the children components
  return children;
};

export default ProtectedRoute;
