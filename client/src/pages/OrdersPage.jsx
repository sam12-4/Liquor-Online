import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrdersPage = () => {
  const { user } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching orders from an API
    const fetchOrders = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await axios.get('/api/orders');
        // setOrders(response.data);
        
        // For now, we'll use mock data
        setTimeout(() => {
          setOrders([
            {
              _id: '1',
              orderNumber: 'ORD-2023-001',
              date: '2023-03-15',
              total: 129.99,
              status: 'Delivered',
              items: [
                { name: 'Johnnie Walker Black Label', quantity: 1, price: 45.99 },
                { name: 'Glenfiddich 12 Year', quantity: 1, price: 59.99 },
                { name: 'Bombay Sapphire Gin', quantity: 1, price: 24.99 }
              ]
            },
            {
              _id: '2',
              orderNumber: 'ORD-2023-002',
              date: '2023-02-28',
              total: 89.98,
              status: 'Delivered',
              items: [
                { name: 'Grey Goose Vodka', quantity: 1, price: 39.99 },
                { name: 'Hendrick\'s Gin', quantity: 1, price: 49.99 }
              ]
            },
            {
              _id: '3',
              orderNumber: 'ORD-2023-003',
              date: '2023-03-10',
              total: 149.97,
              status: 'Processing',
              items: [
                { name: 'Macallan 12 Year Double Cask', quantity: 1, price: 79.99 },
                { name: 'Don Julio Blanco Tequila', quantity: 1, price: 49.99 },
                { name: 'Aperol', quantity: 1, price: 19.99 }
              ]
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
    <div className="orders-page container py-5">
      <h1 className="mb-4">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="alert alert-info">
          You haven't placed any orders yet. <Link to="/products">Continue shopping</Link>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order.orderNumber}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`badge bg-${
                          order.status === 'Delivered' ? 'success' : 
                          order.status === 'Processing' ? 'warning' : 
                          order.status === 'Shipped' ? 'info' : 'secondary'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <Link to={`/orders/${order._id}`} className="btn btn-sm btn-outline-primary">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage; 