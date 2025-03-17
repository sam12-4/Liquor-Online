import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alertActions';

const AdminSettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Check if user is authenticated as admin
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    
    if (!adminLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Admin profile state
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    username: 'admin',
    email: 'sameerh64h@gmail.com',
    phone: '+92 327844320'
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle profile form changes
  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to an API
    // For now, we'll just simulate a successful update
    localStorage.setItem('adminProfile', JSON.stringify(profileData));
    dispatch(setAlert('Profile updated successfully', 'success'));
  };

  // Handle password form submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    
    // Check if current password is correct (hardcoded for demo)
    if (currentPassword !== 'admin') {
      dispatch(setAlert('Current password is incorrect', 'danger'));
      return;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      dispatch(setAlert('New passwords do not match', 'danger'));
      return;
    }
    
    // Check password strength
    if (newPassword.length < 6) {
      dispatch(setAlert('Password must be at least 6 characters', 'danger'));
      return;
    }
    
    // In a real app, you would send this data to an API
    // For now, we'll just simulate a successful update
    localStorage.setItem('adminPassword', newPassword);
    dispatch(setAlert('Password updated successfully', 'success'));
    
    // Clear password fields
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container-fluid py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Settings</h1>
          <button 
            onClick={() => navigate('/admin')}
            className="btn btn-outline"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-6">Profile Settings</h2>
            
            <form onSubmit={handleProfileSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-neutral-dark mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-neutral-dark mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profileData.username}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-dark mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
              >
                Update Profile
              </button>
            </form>
          </div>
          
          {/* Password Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-6">Change Password</h2>
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-dark mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-dark mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-dark mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
              >
                Update Password
              </button>
            </form>
          </div>
          
          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-6">Security Settings</h2>
            
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" id="toggle" className="sr-only" />
                  <label htmlFor="toggle" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Login Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive notifications for new login attempts</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" id="toggle2" className="sr-only" checked />
                  <label htmlFor="toggle2" className="block overflow-hidden h-6 rounded-full bg-primary cursor-pointer"></label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Session Timeout</h3>
                  <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60" selected>1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-6">Notification Settings</h2>
            
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive email notifications for important events</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" id="toggle3" className="sr-only" checked />
                  <label htmlFor="toggle3" className="block overflow-hidden h-6 rounded-full bg-primary cursor-pointer"></label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Order Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive notifications for new orders</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" id="toggle4" className="sr-only" checked />
                  <label htmlFor="toggle4" className="block overflow-hidden h-6 rounded-full bg-primary cursor-pointer"></label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Low Stock Alerts</h3>
                  <p className="text-sm text-muted-foreground">Receive notifications when products are low in stock</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" id="toggle5" className="sr-only" checked />
                  <label htmlFor="toggle5" className="block overflow-hidden h-6 rounded-full bg-primary cursor-pointer"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage; 