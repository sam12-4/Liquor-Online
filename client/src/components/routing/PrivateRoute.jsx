import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, guestOnly, ...rest }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  
  if (loading) {
    // Show a loading spinner or placeholder while auth state is being checked
    return <div className="loader">Loading...</div>;
  }
  
  if (guestOnly) {
    // If route is for guests only (like login page) and user is authenticated, redirect to home
    return (
      <Route
        {...rest}
        render={() =>
          isAuthenticated ? (
            <Redirect to="/" />
          ) : (
            children
          )
        }
      />
    );
  }
  
  // Regular private route - redirect to login if not authenticated
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute; 