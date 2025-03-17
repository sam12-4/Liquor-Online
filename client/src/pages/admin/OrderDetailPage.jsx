import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusOptions] = useState([
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled'
  ]);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Simulate fetching order details from an API
    const fetchOrderDetails = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await axios.get(`/api/admin/orders/${id}`);
        // setOrder(response.data);
        
        // For now, we'll use mock data
        setTimeout(() => {
          // Mock order data based on the ID
          const mockOrders = {
            '1': {
              _id: '1',
              orderNumber: 'ORD-2023-001',
              date: '2023-03-15',
              customer: {
                _id: 'c1',
                name: 'John Doe',
                email: 'john@example.com',
                phone: '555-123-4567'
              },
              total: 129.99,
              subtotal: 130.97,
              tax: 10.48,
              shipping: 8.99,
              discount: 20.45,
              status: 'Delivered',
              paymentStatus: 'Paid',
              paymentMethod: 'Credit Card (Visa ending in 4242)',
              shippingAddress: {
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA'
              },
              billingAddress: {
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
                  sku: 'JW-BL-750',
                  image: 'https://example.com/johnnie-walker.jpg'
                },
                { 
                  _id: 'p2', 
                  name: 'Glenfiddich 12 Year', 
                  quantity: 1, 
                  price: 59.99,
                  sku: 'GF-12-750',
                  image: 'https://example.com/glenfiddich.jpg'
                },
                { 
                  _id: 'p3', 
                  name: 'Bombay Sapphire Gin', 
                  quantity: 1, 
                  price: 24.99,
                  sku: 'BS-GIN-750',
                  image: 'https://example.com/bombay.jpg'
                }
              ],
              notes: 'Customer requested gift wrapping.',
              timeline: [
                { date: '2023-03-15 10:30 AM', status: 'Order Placed', user: 'System' },
                { date: '2023-03-15 11:45 AM', status: 'Payment Confirmed', user: 'System' },
                { date: '2023-03-16 09:15 AM', status: 'Processing', user: 'Admin (Jane)' },
                { date: '2023-03-17 02:30 PM', status: 'Shipped', user: 'Admin (Mike)' },
                { date: '2023-03-20 11:20 AM', status: 'Delivered', user: 'System' }
              ]
            },
            // Add more mock orders as needed
          };
          
          const foundOrder = mockOrders[id];
          setOrder(foundOrder || null);
          if (foundOrder) {
            setNewStatus(foundOrder.status);
          }
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    // In a real app, you would update the status via API
    // axios.put(`/api/admin/orders/${id}/status`, { status: newStatus })
    //   .then(response => {
    //     setOrder({ ...order, status: newStatus });
    //   })
    //   .catch(error => {
    //     console.error('Error updating status:', error);
    //   });
    
    // For now, we'll just update the local state
    setOrder({
      ...order,
      status: newStatus,
      timeline: [
        ...order.timeline,
        {
          date: new Date().toLocaleString(),
          status: `Status Updated to ${newStatus}`,
          user: 'Admin (You)'
        }
      ]
    });
  };

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
          Order not found. <Link to="/admin/orders">Return to orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-order-detail-page container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Order #{order.orderNumber}</h1>
        <div>
          <Link to="/admin/orders" className="btn btn-outline-secondary me-2">
            Back to Orders
          </Link>
          <div className="btn-group">
            <button className="btn btn-outline-primary">
              <i className="bi bi-printer"></i> Print
            </button>
            <button className="btn btn-outline-primary">
              <i className="bi bi-envelope"></i> Email
            </button>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-8">
          {/* Order Status */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Order Status</h5>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <span className="fw-bold me-2">Current Status:</span>
                  <span className={`badge bg-${
                    order.status === 'Delivered' ? 'success' : 
                    order.status === 'Processing' ? 'warning' : 
                    order.status === 'Shipped' ? 'info' : 
                    order.status === 'Cancelled' ? 'danger' : 'secondary'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="col-md-8">
                  <div className="input-group">
                    <select 
                      className="form-select" 
                      value={newStatus}
                      onChange={handleStatusChange}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    <button 
                      className="btn btn-primary" 
                      onClick={handleUpdateStatus}
                      disabled={newStatus === order.status}
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Order Items</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map(item => (
                      <tr key={item._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0" style={{ width: '50px', height: '50px' }}>
                              <div className="bg-light d-flex align-items-center justify-content-center h-100">
                                {/* Use actual image in production */}
                                <span className="text-muted small">Image</span>
                              </div>
                            </div>
                            <div className="ms-3">
                              <h6 className="mb-0">{item.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>{item.sku}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Order Timeline */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Order Timeline</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {order.timeline.map((event, index) => (
                  <li key={index} className="list-group-item px-0">
                    <div className="d-flex justify-content-between">
                      <div>
                        <span className="fw-bold">{event.status}</span>
                        <small className="text-muted ms-2">by {event.user}</small>
                      </div>
                      <span className="text-muted">{event.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Order Notes */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Order Notes</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="orderNotes" className="form-label">Notes</label>
                <textarea 
                  className="form-control" 
                  id="orderNotes" 
                  rows="3"
                  defaultValue={order.notes}
                ></textarea>
              </div>
              <button className="btn btn-primary">Save Notes</button>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          {/* Customer Information */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Customer Information</h5>
            </div>
            <div className="card-body">
              <h6>{order.customer.name}</h6>
              <p className="mb-1">
                <i className="bi bi-envelope me-2"></i>
                <a href={`mailto:${order.customer.email}`}>{order.customer.email}</a>
              </p>
              <p className="mb-0">
                <i className="bi bi-telephone me-2"></i>
                <a href={`tel:${order.customer.phone}`}>{order.customer.phone}</a>
              </p>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="card mb-4">
            <div className="card-header bg-light">
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
              <div className="mt-3">
                <span className="fw-bold me-2">Payment Status:</span>
                <span className={`badge bg-${
                  order.paymentStatus === 'Paid' ? 'success' : 
                  order.paymentStatus === 'Pending' ? 'warning' : 
                  order.paymentStatus === 'Failed' ? 'danger' : 'secondary'
                }`}>
                  {order.paymentStatus}
                </span>
              </div>
              <div className="mt-2">
                <span className="fw-bold">Payment Method:</span>
                <p className="mb-0 mt-1">{order.paymentMethod}</p>
              </div>
            </div>
          </div>
          
          {/* Shipping Information */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Shipping Address</h5>
            </div>
            <div className="card-body">
              <address>
                <strong>{order.customer.name}</strong><br />
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.country}
              </address>
            </div>
          </div>
          
          {/* Billing Information */}
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Billing Address</h5>
            </div>
            <div className="card-body">
              <address>
                <strong>{order.customer.name}</strong><br />
                {order.billingAddress.street}<br />
                {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}<br />
                {order.billingAddress.country}
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage; 