import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching orders from an API
    const fetchOrders = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await axios.get('/api/admin/orders');
        // setOrders(response.data);
        
        // For now, we'll use mock data
        setTimeout(() => {
          setOrders([
            {
              _id: '1',
              orderNumber: 'ORD-2023-001',
              date: '2023-03-15',
              customer: {
                _id: 'c1',
                name: 'John Doe',
                email: 'john@example.com'
              },
              total: 129.99,
              status: 'Delivered',
              paymentStatus: 'Paid'
            },
            {
              _id: '2',
              orderNumber: 'ORD-2023-002',
              date: '2023-02-28',
              customer: {
                _id: 'c2',
                name: 'Jane Smith',
                email: 'jane@example.com'
              },
              total: 89.98,
              status: 'Delivered',
              paymentStatus: 'Paid'
            },
            {
              _id: '3',
              orderNumber: 'ORD-2023-003',
              date: '2023-03-10',
              customer: {
                _id: 'c3',
                name: 'Bob Johnson',
                email: 'bob@example.com'
              },
              total: 149.97,
              status: 'Processing',
              paymentStatus: 'Paid'
            },
            {
              _id: '4',
              orderNumber: 'ORD-2023-004',
              date: '2023-03-18',
              customer: {
                _id: 'c4',
                name: 'Alice Brown',
                email: 'alice@example.com'
              },
              total: 75.50,
              status: 'Shipped',
              paymentStatus: 'Paid'
            },
            {
              _id: '5',
              orderNumber: 'ORD-2023-005',
              date: '2023-03-20',
              customer: {
                _id: 'c5',
                name: 'Charlie Wilson',
                email: 'charlie@example.com'
              },
              total: 210.45,
              status: 'Processing',
              paymentStatus: 'Pending'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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

  return (
    <div className="admin-orders-page container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Manage Orders</h1>
      </div>
      
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="all">All Orders</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No orders found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order._id}>
                      <td>{order.orderNumber}</td>
                      <td>{order.date}</td>
                      <td>
                        <div>{order.customer.name}</div>
                        <small className="text-muted">{order.customer.email}</small>
                      </td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <span className={`badge bg-${
                          order.status === 'Delivered' ? 'success' : 
                          order.status === 'Processing' ? 'warning' : 
                          order.status === 'Shipped' ? 'info' : 
                          order.status === 'Cancelled' ? 'danger' : 'secondary'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge bg-${
                          order.paymentStatus === 'Paid' ? 'success' : 
                          order.paymentStatus === 'Pending' ? 'warning' : 
                          order.paymentStatus === 'Failed' ? 'danger' : 'secondary'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <Link 
                            to={`/admin/orders/${order._id}`} 
                            className="btn btn-sm btn-outline-primary"
                          >
                            View
                          </Link>
                          <button 
                            type="button" 
                            className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span className="visually-hidden">Toggle Dropdown</span>
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">
                                Update Status
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Send Email
                              </a>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                              <a className="dropdown-item text-danger" href="#">
                                Cancel Order
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <nav aria-label="Orders pagination">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage; 