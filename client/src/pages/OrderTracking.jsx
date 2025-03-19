import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderTracking = () => {
  const location = useLocation();
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Check if we have order info from a redirect
  useEffect(() => {
    // If coming from checkout confirmation
    if (location.state && location.state.orderNumber) {
      setOrderNumber(location.state.orderNumber);
      setEmail(location.state.email || '');
      
      // Auto-track if both values exist
      if (location.state.orderNumber && location.state.email) {
        handleTrackOrder({
          preventDefault: () => {},
          orderNumber: location.state.orderNumber,
          email: location.state.email
        });
      }
    }
    
    // Check localStorage for guest order tracking info
    const storedOrderNumber = localStorage.getItem('guestOrderNumber');
    const storedOrderEmail = localStorage.getItem('guestOrderEmail');
    
    if (storedOrderNumber && storedOrderEmail && !location.state) {
      setOrderNumber(storedOrderNumber);
      setEmail(storedOrderEmail);
    }
  }, [location]);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!orderNumber || !email) {
      setError('Please enter both order number and email');
      return;
    }
    
    setFormSubmitted(true);
    setLoading(true);
    setError('');
    
    // Prepare tracking data
    const trackingData = {
      orderNumber: e.orderNumber || orderNumber,
      email: e.email || email
    };
    
    try {
      // This would be an actual API call
      // const response = await fetch('/api/orders/guest/track', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(trackingData)
      // });
      
      // const data = await response.json();
      
      // if (!data.success) {
      //   throw new Error(data.message || 'Failed to track order');
      // }
      
      // setTrackingInfo(data.data);
      
      // Mock response for demo
      setTimeout(() => {
        // Mock order tracking data
        setTrackingInfo({
          orderNumber: trackingData.orderNumber,
          orderId: '60d21b4967d0d8992e610c85',
          orderDate: new Date().toISOString(),
          status: 'processing',
          statusText: 'Order is being processed',
          progress: 30,
          nextStep: 'Your order will be shipped soon',
          statusHistory: [
            {
              status: 'pending',
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              comment: 'Order received'
            },
            {
              status: 'processing',
              timestamp: new Date().toISOString(),
              comment: 'Order is being processed'
            }
          ],
          trackingNumber: null,
          shippingMethod: 'Standard Shipping',
          estimatedDeliveryDate: new Date(Date.now() + 5 * 86400000).toISOString(),
          isDelivered: false,
          deliveredAt: null,
          guestName: 'John Doe',
          orderItems: [
            {
              name: 'Johnnie Walker Black Label',
              image: 'https://web-assets.same.dev/2392223567/4134181266.webp',
              quantity: 1,
              price: 49.99
            },
            {
              name: 'Grey Goose Vodka',
              image: 'https://web-assets.same.dev/2392223567/4134181266.webp',
              quantity: 2,
              price: 59.99
            }
          ],
          shippingAddress: {
            fullName: 'John Doe',
            address: '123 Main St',
            city: 'Toronto',
            postalCode: 'M5V 2K7',
            country: 'Canada'
          },
          paymentMethod: 'credit-card',
          subtotalPrice: 169.97,
          taxPrice: 8.50,
          shippingPrice: 15.00,
          totalPrice: 193.47
        });
        
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      setError(error.message || 'Something went wrong');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container-fluid">
          <h1 className="text-3xl font-bold">Track Your Order</h1>
          <div className="flex items-center mt-2">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Order Tracking</span>
          </div>
        </div>
      </div>

      <div className="container-fluid py-16">
        <div className="max-w-3xl mx-auto">
          {!formSubmitted || error ? (
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-neutral-dark mb-6">Track Your Order</h2>
              
              <form onSubmit={handleTrackOrder}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="orderNumber" className="block text-sm font-medium text-neutral-dark mb-1">
                      Order Number *
                    </label>
                    <input
                      type="text"
                      id="orderNumber"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your order number (e.g., 2311-12345)"
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
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter the email used for the order"
                    />
                  </div>
                  
                  {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium disabled:opacity-70"
                  >
                    {loading ? 'Searching...' : 'Track Order'}
                  </button>
                </div>
              </form>
            </div>
          ) : loading ? (
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-neutral-dark">Tracking your order...</p>
            </div>
          ) : trackingInfo ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-neutral-dark">Order #{trackingInfo.orderNumber}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    trackingInfo.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    trackingInfo.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    trackingInfo.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    trackingInfo.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {trackingInfo.statusText}
                  </span>
                </div>
                
                <p className="text-sm text-neutral mt-1">
                  Placed on {formatDate(trackingInfo.orderDate)}
                </p>
              </div>
              
              {/* Progress Tracker */}
              <div className="p-6 border-b border-gray-200">
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium text-neutral-dark">Order Progress</span>
                  <span className="text-sm font-medium text-neutral-dark">{trackingInfo.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${trackingInfo.progress}%` }}
                  ></div>
                </div>
                <p className="mt-3 text-sm text-neutral">
                  <strong>Next: </strong>{trackingInfo.nextStep}
                </p>
              </div>
              
              {/* Order Details */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-medium text-neutral-dark mb-4">Order Details</h3>
                
                <div className="space-y-4">
                  {trackingInfo.orderItems.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-neutral-dark">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-neutral">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${trackingInfo.subtotalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${trackingInfo.shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${trackingInfo.taxPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-neutral-dark pt-2 border-t">
                    <span>Total</span>
                    <span>${trackingInfo.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Shipping Info */}
              <div className="p-6 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-neutral-dark mb-2">Shipping Address</h3>
                    <p className="text-sm text-neutral">
                      {trackingInfo.shippingAddress.fullName}<br />
                      {trackingInfo.shippingAddress.address}<br />
                      {trackingInfo.shippingAddress.city}, {trackingInfo.shippingAddress.postalCode}<br />
                      {trackingInfo.shippingAddress.country}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-neutral-dark mb-2">Shipping Method</h3>
                    <p className="text-sm text-neutral">{trackingInfo.shippingMethod}</p>
                    
                    {trackingInfo.trackingNumber && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-neutral-dark">Tracking Number</h4>
                        <p className="text-sm text-neutral">{trackingInfo.trackingNumber}</p>
                      </div>
                    )}
                    
                    {trackingInfo.estimatedDeliveryDate && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-neutral-dark">Estimated Delivery</h4>
                        <p className="text-sm text-neutral">{formatDate(trackingInfo.estimatedDeliveryDate)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Status History */}
              <div className="p-6">
                <h3 className="font-medium text-neutral-dark mb-4">Status Updates</h3>
                
                <div className="space-y-4">
                  {trackingInfo.statusHistory.map((status, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 flex-shrink-0">
                        <div className={`h-4 w-4 rounded-full mt-1 ${
                          status.status === 'delivered' ? 'bg-green-500' :
                          status.status === 'shipped' ? 'bg-blue-500' :
                          status.status === 'processing' ? 'bg-yellow-500' :
                          status.status === 'cancelled' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`}></div>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-dark">
                          {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                        </p>
                        <div className="mt-1 text-sm text-neutral">
                          <p>{status.comment}</p>
                          <p>{new Date(status.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-end bg-gray-50 p-4">
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="text-primary hover:text-primary-dark transition-colors text-sm font-medium"
                >
                  Track Another Order
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking; 