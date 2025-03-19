import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'Canada',
    address1: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    phone: '',
    email: '',
    notes: '',
    createAccount: false,
    password: '',
    paymentMethod: 'credit-card',
    sameShippingAddress: true,
    isGuest: true,
  });

  const [cartItems] = useState([
    {
      id: 1,
      name: 'Johnnie Walker Black Label',
      price: 49.99,
      quantity: 1,
      image: 'https://web-assets.same.dev/2392223567/4134181266.webp'
    },
    {
      id: 2,
      name: 'Grey Goose Vodka',
      price: 59.99,
      quantity: 2,
      image: 'https://web-assets.same.dev/2392223567/4134181266.webp'
    }
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare order data
    const orderData = {
      orderItems: cartItems.map(item => ({
        product: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      shippingAddress: {
        fullName: `${formData.firstName} ${formData.lastName}`,
        address: formData.address1 + (formData.address2 ? `, ${formData.address2}` : ''),
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        province: formData.province
      },
      paymentMethod: formData.paymentMethod,
      taxPrice: tax,
      shippingPrice: shipping,
      totalPrice: total
    };
    
    // Add guest details if checking out as guest
    if (formData.isGuest && !formData.createAccount) {
      orderData.guestDetails = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone
      };
      
      // For guest checkout
      console.log('Guest checkout with:', orderData);
      
      // API call would go here (to /api/orders/guest endpoint)
      // Example:
      // axios.post('/api/orders/guest', orderData)
      //   .then(response => {
      //     // Store order tracking info in localStorage or state
      //     localStorage.setItem('guestOrderNumber', response.data.data.order.orderNumber);
      //     localStorage.setItem('guestOrderEmail', formData.email);
      //     // Redirect to thank you/tracking page
      //     navigate('/order-confirmation', { 
      //       state: { 
      //         orderNumber: response.data.data.order.orderNumber,
      //         isGuest: true,
      //         email: formData.email
      //       } 
      //     });
      //   })
      //   .catch(error => console.error('Error placing order:', error));
      
    } else if (formData.createAccount) {
      // User wants to create an account
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password
      };
      
      console.log('Create account and checkout:', userData, orderData);
      
      // Register then place order logic would go here
      
    } else {
      // Existing user checkout
      console.log('User checkout:', orderData);
      
      // API call for logged-in user would go here
    }
    
    // For demo
    alert('Order placed successfully! (This is a demo)');
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% GST
  const shipping = 15.00;
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container-fluid">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <div className="flex items-center mt-2">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/cart" className="text-white hover:underline">Cart</Link>
            <span className="mx-2">/</span>
            <span>Checkout</span>
          </div>
        </div>
      </div>

      <div className="container-fluid py-16">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Billing & Shipping */}
            <div className="lg:col-span-2 space-y-8">
              {/* Billing Details */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-neutral-dark mb-6">Billing Details</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-dark mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-dark mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-neutral-dark mb-1">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-neutral-dark mb-1">
                      Country / Region *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="address1" className="block text-sm font-medium text-neutral-dark mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      value={formData.address1}
                      onChange={handleChange}
                      required
                      placeholder="House number and street name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                    />
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleChange}
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-neutral-dark mb-1">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="province" className="block text-sm font-medium text-neutral-dark mb-1">
                        Province *
                      </label>
                      <select
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select a province</option>
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland and Labrador</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NU">Nunavut</option>
                        <option value="YT">Yukon</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-neutral-dark mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-dark mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
              
              {/* Shipping Options */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <input
                    id="sameShippingAddress"
                    name="sameShippingAddress"
                    type="checkbox"
                    checked={formData.sameShippingAddress}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="sameShippingAddress" className="ml-2 block text-sm text-neutral-dark">
                    Ship to the same address
                  </label>
                </div>
                
                {/* Shipping address form would go here if sameShippingAddress is false */}
                
                <div className="mt-4">
                  <label htmlFor="notes" className="block text-sm font-medium text-neutral-dark mb-1">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Notes about your order, e.g. special delivery instructions"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>
              </div>
              
              {/* Account Creation */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <input
                      id="isGuest"
                      name="isGuest"
                      type="radio"
                      checked={formData.isGuest && !formData.createAccount}
                      onChange={() => setFormData(prev => ({ ...prev, isGuest: true, createAccount: false }))}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="isGuest" className="ml-2 block text-sm text-neutral-dark">
                      Checkout as guest
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="createAccount"
                      name="createAccount"
                      type="radio"
                      checked={formData.createAccount}
                      onChange={() => setFormData(prev => ({ ...prev, createAccount: true, isGuest: false }))}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="createAccount" className="ml-2 block text-sm text-neutral-dark">
                      Create an account
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="existingAccount"
                      name="existingAccount"
                      type="radio"
                      checked={!formData.isGuest && !formData.createAccount}
                      onChange={() => setFormData(prev => ({ ...prev, isGuest: false, createAccount: false }))}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="existingAccount" className="ml-2 block text-sm text-neutral-dark">
                      Login to existing account
                    </label>
                  </div>
                </div>
                
                {formData.createAccount && (
                  <div className="mt-4">
                    <label htmlFor="password" className="block text-sm font-medium text-neutral-dark mb-1">
                      Create Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required={formData.createAccount}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="mt-1 text-sm text-muted-foreground">
                      An account will be created with your email and password.
                    </p>
                  </div>
                )}
                
                {!formData.isGuest && !formData.createAccount && (
                  <div className="mt-4 p-4 bg-gray-50 rounded">
                    <p className="text-sm mb-2">Please log in before proceeding with checkout:</p>
                    <Link 
                      to="/login" 
                      className="inline-block bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors text-sm"
                    >
                      Go to Login Page
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-md rounded-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold text-neutral-dark mb-6">Your Order</h2>
                
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between font-medium text-neutral-dark mb-2">
                    <span>Product</span>
                    <span>Subtotal</span>
                  </div>
                  
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between py-2 text-sm">
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover mr-2" />
                        <span>{item.name} × {item.quantity}</span>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                {/* Payment Methods */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <input
                      id="credit-card"
                      name="paymentMethod"
                      type="radio"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="credit-card" className="ml-2 block text-sm text-neutral-dark">
                      Credit Card (Stripe)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="paypal" className="ml-2 block text-sm text-neutral-dark">
                      PayPal
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="etransfer"
                      name="paymentMethod"
                      type="radio"
                      value="etransfer"
                      checked={formData.paymentMethod === 'etransfer'}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="etransfer" className="ml-2 block text-sm text-neutral-dark">
                      E-Transfer
                    </label>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground mb-6">
                  <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Place Order
                </button>
                
                <div className="flex items-center justify-center mt-4">
                  <img src="https://web-assets.same.dev/2392223567/4134181266.webp" alt="Payment Methods" className="h-8" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 