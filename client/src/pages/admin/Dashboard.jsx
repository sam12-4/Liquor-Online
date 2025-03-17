import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alertActions';

/**
 * Admin Dashboard component
 * Provides overview of store metrics and links to admin functionality
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  
  // Check if user is authenticated and is admin
  useEffect(() => {
    // In a real app, you would check if the user is authenticated and is an admin
    // For now, we'll just check if adminLoggedIn is true in localStorage
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    
    if (!adminLoggedIn && (!isAuthenticated || (user && !user.isAdmin))) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, user, navigate]);

  // Load product and order data
  useEffect(() => {
    // Load products from localStorage
    const loadProductData = () => {
      try {
        const storedProducts = localStorage.getItem('products');
        const products = storedProducts ? JSON.parse(storedProducts) : [];
        
        // Load orders from localStorage
        const storedOrders = localStorage.getItem('orders');
        const orders = storedOrders ? JSON.parse(storedOrders) : [];
        
        // Create sample orders if none exist
        if (orders.length === 0) {
          const sampleOrders = [
            { id: 'ORD-001', customer: 'John Doe', date: '2023-06-15', status: 'Completed', total: '$156.00' },
            { id: 'ORD-002', customer: 'Jane Smith', date: '2023-06-14', status: 'Processing', total: '$89.50' },
            { id: 'ORD-003', customer: 'Robert Johnson', date: '2023-06-14', status: 'Pending', total: '$210.75' },
            { id: 'ORD-004', customer: 'Emily Davis', date: '2023-06-13', status: 'Completed', total: '$45.99' },
            { id: 'ORD-005', customer: 'Michael Brown', date: '2023-06-12', status: 'Shipped', total: '$178.25' },
          ];
          localStorage.setItem('orders', JSON.stringify(sampleOrders));
          setRecentOrders(sampleOrders);
        } else {
          setRecentOrders(orders);
        }
        
        // Update stats
        setStats([
          { name: 'Total Products', value: products.length.toString() },
          { name: 'Total Orders', value: orders.length.toString() },
          { name: 'Total Users', value: '89' },
          { name: 'Revenue', value: '$' + calculateTotalRevenue(orders).toFixed(2) },
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
        dispatch(setAlert('Error loading dashboard data', 'danger'));
      }
    };
    
    loadProductData();
    
    // Set up interval to refresh data every 30 seconds
    const intervalId = setInterval(loadProductData, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);
  
  // Calculate total revenue from orders
  const calculateTotalRevenue = (orders) => {
    return orders.reduce((total, order) => {
      // Extract numeric value from total string (remove $ and convert to number)
      const orderTotal = parseFloat(order.total.replace('$', '')) || 0;
      return total + orderTotal;
    }, 0);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container-fluid py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <Link to="/admin/settings" className="btn btn-outline">Settings</Link>
            <button 
              onClick={() => {
                localStorage.removeItem('adminLoggedIn');
                navigate('/');
              }}
              className="btn btn-primary"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-muted-foreground text-sm font-medium">{stat.name}</h3>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/admin/products" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Manage Products</h3>
                <p className="text-sm text-muted-foreground">Add, edit, or remove products</p>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/orders" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Manage Orders</h3>
                <p className="text-sm text-muted-foreground">View and update order status</p>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/users" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Manage Users</h3>
                <p className="text-sm text-muted-foreground">View and manage user accounts</p>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/taxonomy" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Manage Categories</h3>
                <p className="text-sm text-muted-foreground">Organize products with categories</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Recent Orders</h2>
            <Link to="/admin/orders" className="text-primary text-sm hover:underline">View all</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-purple-100 text-purple-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/admin/orders/${order.id}`} className="text-primary hover:text-primary-dark">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Low Stock Products Alert */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Low Stock Products</h2>
            <Link to="/admin/products" className="text-primary text-sm hover:underline">Manage inventory</Link>
          </div>
          
          <div className="overflow-x-auto">
            <LowStockProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

// Low stock products component
const LowStockProducts = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = () => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        // Filter for products with stock ≤ 5
        const lowStock = products.filter(product => product.inStock <= 5);
        setLowStockProducts(lowStock);
      }
    };
    
    fetchProducts();
    
    // Set up interval to refresh data every 10 seconds
    const intervalId = setInterval(fetchProducts, 10000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  if (lowStockProducts.length === 0) {
    return <p className="text-sm text-muted-foreground">No products with low stock.</p>;
  }
  
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {lowStockProducts.map((product) => (
          <tr key={product.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">${product.price.toFixed(2)}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                {product.inStock} in stock
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Link to={`/admin/products/${product.id}`} className="text-primary hover:text-primary-dark">
                Update Stock
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Dashboard; 