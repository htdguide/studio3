// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedInUser, children }) => {
  if (!loggedInUser) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children; // User is logged in, render the children components
};

export default ProtectedRoute;
