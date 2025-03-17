import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector(state => state.auth);
  
  // Check if user is authenticated, not loading, and has admin role
  const isAdmin = isAuthenticated && !loading && user && user.role === 'admin';
  
  if (loading) {
    // Show a loading spinner or placeholder while auth state is being checked
    return <div className="loader">Loading...</div>;
  }
  
  return (
    <Route
      {...rest}
      render={() =>
        isAdmin ? (
          children
        ) : (
          // Redirect to login if not authenticated, or to home if authenticated but not admin
          <Redirect to={isAuthenticated ? '/' : '/login'} />
        )
      }
    />
  );
};

export default AdminRoute; 