import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';

const Login = ({ login, setAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    setAlert('Login functionality has been removed', 'info');
    // Call placeholder login function
    login(email, password);
  };

  return (
    <section className="container mx-auto max-w-md py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Sign In</h1>
      <p className="text-lg mb-6 text-center">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <p className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
        Authentication has been removed from this application
      </p>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full cursor-pointer"
        />
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:text-blue-700">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default connect(null, { login, setAlert })(Login); 