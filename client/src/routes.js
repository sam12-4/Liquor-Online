import React from 'react';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AccountPage from './pages/AccountPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// Additional pages
import ContactFaq from './pages/ContactFaq';
import TrackOrder from './pages/TrackOrder';
import Returns from './pages/Returns';
import Shipping from './pages/Shipping';
import Finance from './pages/Finance';
import SpecialOrders from './pages/SpecialOrders';
import PrivateCommercial from './pages/PrivateCommercial';
import FreeDraw from './pages/FreeDraw';
import Jobs from './pages/Jobs';

// Admin pages (now accessible without authentication)
import Dashboard from './pages/admin/Dashboard';
import ProductsManagement from './pages/admin/ProductsManagement';
import ProductEdit from './pages/admin/ProductEdit';
import AdminOrdersPage from './pages/admin/OrdersPage';
import AdminOrderDetailPage from './pages/admin/OrderDetailPage';
import AdminUsersPage from './pages/admin/UsersPage';
import TaxonomyManagement from './pages/admin/TaxonomyManagement';
import AdminSettingsPage from './pages/admin/SettingsPage';
import AccountSettings from './pages/AccountSettings';

const routes = [
  // Public routes
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/contact',
    component: Contact
  },
  {
    path: '/products',
    exact: true,
    component: ProductsPage
  },
  {
    path: '/products/:id',
    component: ProductDetail
  },
  {
    path: '/product-category/:category',
    component: ProductsPage
  },
  {
    path: '/brand/:brand',
    component: ProductsPage
  },
  {
    path: '/product-tag/:tag',
    component: ProductsPage
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/checkout',
    component: Checkout
  },
  {
    path: '/account',
    component: AccountPage
  },
  {
    path: '/account/settings',
    component: AccountSettings
  },
  {
    path: '/orders',
    exact: true,
    component: OrdersPage
  },
  {
    path: '/orders/:id',
    component: OrderDetailPage
  },
  
  // Additional routes
  {
    path: '/contact-faq',
    component: ContactFaq
  },
  {
    path: '/track-order',
    component: TrackOrder
  },
  {
    path: '/returns',
    component: Returns
  },
  {
    path: '/shipping',
    component: Shipping
  },
  {
    path: '/finance',
    component: Finance
  },
  {
    path: '/special-orders',
    component: SpecialOrders
  },
  {
    path: '/private-commercial',
    component: PrivateCommercial
  },
  {
    path: '/free-draw',
    component: FreeDraw
  },
  {
    path: '/jobs',
    component: Jobs
  },
  
  // Admin routes (now accessible without authentication)
  {
    path: '/admin',
    exact: true,
    component: Dashboard
  },
  {
    path: '/admin/products',
    exact: true,
    component: ProductsManagement
  },
  {
    path: '/admin/products/create',
    component: ProductEdit
  },
  {
    path: '/admin/products/:id',
    component: ProductEdit
  },
  {
    path: '/admin/orders',
    exact: true,
    component: AdminOrdersPage
  },
  {
    path: '/admin/orders/:id',
    component: AdminOrderDetailPage
  },
  {
    path: '/admin/users',
    component: AdminUsersPage
  },
  {
    path: '/admin/taxonomy',
    component: TaxonomyManagement
  },
  {
    path: '/admin/settings',
    component: AdminSettingsPage
  },
  
  // 404 - Must be last
  {
    path: '*',
    component: NotFoundPage
  }
];

export { routes }; 