import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!orderNumber.trim() || !email.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    
    // In a real application, this would make an API call to track the order
    // For demo purposes, we'll just show a message
    setIsSubmitted(true);
    setError('');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
          <div className="flex items-center">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Track Order</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Order Tracking</h2>
            
            {!isSubmitted ? (
              <>
                <p className="text-muted-foreground mb-6">
                  To track your order, please enter your Order ID and the email address you used for the order in the form below.
                </p>
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="orderNumber" className="block text-sm font-medium text-neutral-dark mb-1">
                      Order ID *
                    </label>
                    <input
                      type="text"
                      id="orderNumber"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="Found in your order confirmation email"
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email used for the order"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium"
                    >
                      Track Order
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 text-green-600 p-4 rounded-md">
                  <p className="font-medium">Order Found!</p>
                  <p>We've located your order. Here are the details:</p>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-gray-50 px-6 py-3 border-b">
                    <h3 className="text-lg font-medium text-neutral-dark">Order #{orderNumber}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="font-medium text-neutral-dark">Order Status:</p>
                      <p className="text-muted-foreground">Shipped</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-neutral-dark">Order Date:</p>
                      <p className="text-muted-foreground">{new Date().toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-neutral-dark">Estimated Delivery:</p>
                      <p className="text-muted-foreground">
                        {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-neutral-dark">Tracking Number:</p>
                      <p className="text-muted-foreground">
                        <a href="#" className="text-primary hover:underline">1Z999AA10123456784</a>
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-neutral-dark">Shipping Method:</p>
                      <p className="text-muted-foreground">Standard Shipping</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-neutral-dark">Shipping Updates</h3>
                  <div className="border-l-2 border-primary pl-4 space-y-4">
                    <div>
                      <p className="font-medium text-neutral-dark">{new Date().toLocaleDateString()} - 10:30 AM</p>
                      <p className="text-muted-foreground">Package has been shipped</p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-dark">{new Date().toLocaleDateString()} - 9:15 AM</p>
                      <p className="text-muted-foreground">Order processed and ready for shipment</p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-dark">{new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString()} - 2:45 PM</p>
                      <p className="text-muted-foreground">Order confirmed</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-gray-200 text-neutral-dark py-2 px-6 rounded-md hover:bg-gray-300 transition-colors font-medium"
                  >
                    Track Another Order
                  </button>
                  
                  <Link
                    to="/contact"
                    className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium"
                  >
                    Need Help?
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Can't find your order? <Link to="/contact" className="text-primary hover:underline">Contact our customer service team</Link> for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder; 