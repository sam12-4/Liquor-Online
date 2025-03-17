import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrderDetailPage = () => {
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching order details from an API
    const fetchOrderDetails = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await axios.get(`/api/orders/${id}`);
        // setOrder(response.data);
        
        // For now, we'll use mock data
        setTimeout(() => {
          // Mock order data based on the ID
          const mockOrders = {
            '1': {
              _id: '1',
              orderNumber: 'ORD-2023-001',
              date: '2023-03-15',
              total: 129.99,
              subtotal: 130.97,
              tax: 10.48,
              shipping: 8.99,
              discount: 20.45,
              status: 'Delivered',
              paymentMethod: 'Credit Card (Visa ending in 4242)',
              shippingAddress: {
                name: 'John Doe',
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA'
              },
              items: [
                { 
                  _id: 'p1', 
                  name: 'Johnnie Walker Black Label', 
                  quantity: 1, 
                  price: 45.99,
                  image: 'https://example.com/johnnie-walker.jpg'
                },
                { 
                  _id: 'p2', 
                  name: 'Glenfiddich 12 Year', 
                  quantity: 1, 
                  price: 59.99,
                  image: 'https://example.com/glenfiddich.jpg'
                },
                { 
                  _id: 'p3', 
                  name: 'Bombay Sapphire Gin', 
                  quantity: 1, 
                  price: 24.99,
                  image: 'https://example.com/bombay.jpg'
                }
              ],
              timeline: [
                { date: '2023-03-15 10:30 AM', status: 'Order Placed' },
                { date: '2023-03-15 11:45 AM', status: 'Payment Confirmed' },
                { date: '2023-03-16 09:15 AM', status: 'Processing' },
                { date: '2023-03-17 02:30 PM', status: 'Shipped' },
                { date: '2023-03-20 11:20 AM', status: 'Delivered' }
              ]
            },
            '2': {
              _id: '2',
              orderNumber: 'ORD-2023-002',
              date: '2023-02-28',
              total: 89.98,
              subtotal: 89.98,
              tax: 7.20,
              shipping: 0,
              discount: 0,
              status: 'Delivered',
              paymentMethod: 'PayPal',
              shippingAddress: {
                name: 'John Doe',
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA'
              },
              items: [
                { 
                  _id: 'p4', 
                  name: 'Grey Goose Vodka', 
                  quantity: 1, 
                  price: 39.99,
                  image: 'https://example.com/grey-goose.jpg'
                },
                { 
                  _id: 'p5', 
                  name: 'Hendrick\'s Gin', 
                  quantity: 1, 
                  price: 49.99,
                  image: 'https://example.com/hendricks.jpg'
                }
              ],
              timeline: [
                { date: '2023-02-28 03:45 PM', status: 'Order Placed' },
                { date: '2023-02-28 03:46 PM', status: 'Payment Confirmed' },
                { date: '2023-03-01 10:30 AM', status: 'Processing' },
                { date: '2023-03-02 01:15 PM', status: 'Shipped' },
                { date: '2023-03-05 09:45 AM', status: 'Delivered' }
              ]
            },
            '3': {
              _id: '3',
              orderNumber: 'ORD-2023-003',
              date: '2023-03-10',
              total: 149.97,
              subtotal: 149.97,
              tax: 12.00,
              shipping: 8.99,
              discount: 0,
              status: 'Processing',
              paymentMethod: 'Credit Card (Mastercard ending in 5555)',
              shippingAddress: {
                name: 'John Doe',
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA'
              },
              items: [
                { 
                  _id: 'p6', 
                  name: 'Macallan 12 Year Double Cask', 
                  quantity: 1, 
                  price: 79.99,
                  image: 'https://example.com/macallan.jpg'
                },
                { 
                  _id: 'p7', 
                  name: 'Don Julio Blanco Tequila', 
                  quantity: 1, 
                  price: 49.99,
                  image: 'https://example.com/don-julio.jpg'
                },
                { 
                  _id: 'p8', 
                  name: 'Aperol', 
                  quantity: 1, 
                  price: 19.99,
                  image: 'https://example.com/aperol.jpg'
                }
              ],
              timeline: [
                { date: '2023-03-10 05:30 PM', status: 'Order Placed' },
                { date: '2023-03-10 05:31 PM', status: 'Payment Confirmed' },
                { date: '2023-03-11 11:45 AM', status: 'Processing' }
              ]
            }
          };
          
          setOrder(mockOrders[id] || null);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Order not found. <Link to="/orders">Return to orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-detail-page container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Order #{order.orderNumber}</h1>
        <Link to="/orders" className="btn btn-outline-secondary">
          Back to Orders
        </Link>
      </div>
      
      <div className="row">
        <div className="col-lg-8">
          {/* Order Items */}
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between">
              <h5 className="mb-0">Order Items</h5>
              <span className={`badge bg-${
                order.status === 'Delivered' ? 'success' : 
                order.status === 'Processing' ? 'warning' : 
                order.status === 'Shipped' ? 'info' : 'secondary'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="card-body">
              {order.items.map(item => (
                <div key={item._id} className="d-flex mb-3 pb-3 border-bottom">
                  <div className="flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                    <div className="bg-light d-flex align-items-center justify-content-center h-100">
                      {/* Use actual image in production */}
                      <span className="text-muted small">Image</span>
                    </div>
                  </div>
                  <div className="ms-3 flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Qty: {item.quantity}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Timeline */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Order Timeline</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {order.timeline.map((event, index) => (
                  <li key={index} className="list-group-item px-0">
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">{event.status}</span>
                      <span className="text-muted">{event.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          {/* Order Summary */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between px-0">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </li>
                {order.discount > 0 && (
                  <li className="list-group-item d-flex justify-content-between px-0 text-success">
                    <span>Discount</span>
                    <span>-${order.discount.toFixed(2)}</span>
                  </li>
                )}
                <li className="list-group-item d-flex justify-content-between px-0">
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between px-0">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between px-0 fw-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Shipping Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Shipping Information</h5>
            </div>
            <div className="card-body">
              <address>
                <strong>{order.shippingAddress.name}</strong><br />
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.country}
              </address>
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Payment Information</h5>
            </div>
            <div className="card-body">
              <p className="mb-0">{order.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage; 