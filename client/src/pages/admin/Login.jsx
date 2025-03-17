import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogin, isAdminLoggedIn, requestAdminPasswordReset } from '../../utils/auth';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '', // This can be either email or username
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState('');

  // Check if already logged in
  useEffect(() => {
    if (isAdminLoggedIn()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // If in forgot password mode
      if (forgotPassword) {
        const result = await requestAdminPasswordReset(formData.identifier);
        
        if (result.success) {
          setResetSuccess(result.message);
        } else {
          setError(result.error);
        }
      } else {
        // Regular login
        const credentials = {
          // Determine if input is email or username
          ...(formData.identifier.includes('@') 
            ? { email: formData.identifier } 
            : { username: formData.identifier }),
          password: formData.password
        };
        
        const result = await adminLogin(credentials, formData.rememberMe);
        
        if (result.success) {
          navigate('/admin');
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
    setError('');
    setResetSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {forgotPassword ? 'Reset Admin Password' : 'Admin Login'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {forgotPassword 
              ? 'Enter your email or username to receive a reset link' 
              : 'Enter your credentials to access the admin dashboard'}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {resetSuccess && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{resetSuccess}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="identifier" className="sr-only">
                {forgotPassword ? 'Email or Username' : 'Email or Username'}
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete={forgotPassword ? "email" : "username"}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder={forgotPassword ? "Email or Username" : "Email or Username"}
                value={formData.identifier}
                onChange={handleChange}
              />
            </div>
            
            {!forgotPassword && (
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          {!forgotPassword && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  className="font-medium text-primary hover:text-primary-dark"
                  onClick={toggleForgotPassword}
                >
                  Forgot your password?
                </button>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {forgotPassword ? 'Send Reset Link' : 'Sign in'}
            </button>
          </div>
          
          {forgotPassword && (
            <div className="text-center">
              <button
                type="button"
                className="font-medium text-primary hover:text-primary-dark"
                onClick={toggleForgotPassword}
              >
                Back to login
              </button>
            </div>
          )}
        </form>
        
        <div className="text-center mt-4">
          <Link to="/" className="font-medium text-primary hover:text-primary-dark">
            &larr; Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 