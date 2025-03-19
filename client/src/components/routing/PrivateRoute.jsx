import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Simplified PrivateRoute component that allows all access
 * Authentication has been removed
 */
const PrivateRoute = ({ children }) => {
  // Always render children since authentication is removed
  return children ? children : <Outlet />;
};

export default PrivateRoute; 