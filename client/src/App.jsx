import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';
import ScrollToTop from './components/ScrollToTop';

// Routes
import { routes } from './routes';

// Pages
import ProductsManagement from './pages/admin/ProductsManagement';
import ProductEdit from './pages/admin/ProductEdit';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';

// CSS
import './index.css';

const App = () => {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <main className="main-content">
        <Alert />
        <Routes>
          {routes.map((route, index) => {
            const RouteElement = route.component;
            return (
              <Route 
                key={index}
                path={route.path}
                element={<RouteElement />}
                exact={route.exact}
              />
            );
          })}
          {/* Admin Routes */}
          <Route path="/admin/products" element={<ProductsManagement />} />
          <Route path="/admin/products/create" element={<ProductEdit />} />
          <Route path="/admin/products/:id/edit" element={<ProductEdit />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
