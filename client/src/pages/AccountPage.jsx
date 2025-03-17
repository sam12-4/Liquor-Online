import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AccountPage = () => {
  const { user } = useSelector(state => state.auth);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  useEffect(() => {
    // If user data is available, populate the form
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile({
        ...profile,
        [parent]: {
          ...profile[parent],
          [child]: value
        }
      });
    } else {
      setProfile({
        ...profile,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would dispatch an action to update the user profile
    console.log('Profile update submitted:', profile);
  };

  return (
    <div className="account-page container py-5">
      <h1 className="mb-4">My Account</h1>
      
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Account Navigation</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item active">Profile</li>
                <li className="list-group-item">Orders</li>
                <li className="list-group-item">Addresses</li>
                <li className="list-group-item">Payment Methods</li>
                <li className="list-group-item">Preferences</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Profile Information</h5>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <h6 className="mt-4">Address</h6>
                
                <div className="mb-3">
                  <label htmlFor="street" className="form-label">Street</label>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    name="address.street"
                    value={profile.address.street}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="address.city"
                      value={profile.address.city}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="state" className="form-label">State/Province</label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      name="address.state"
                      value={profile.address.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="zipCode" className="form-label">Zip/Postal Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipCode"
                      name="address.zipCode"
                      value={profile.address.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      name="address.country"
                      value={profile.address.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage; 