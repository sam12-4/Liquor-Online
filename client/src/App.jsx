import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './contexts/CartContext.jsx'
import { Layout } from './components/layout/Layout.jsx'
import { ROUTES } from './constants/routes.js'

// Pages
import Home from './pages/Home'
import ProductsPage from './pages/ProductsPage'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import ContactFaq from './pages/ContactFaq'
import TrackOrder from './pages/TrackOrder'
import Returns from './pages/Returns'
import Shipping from './pages/Shipping'
import Finance from './pages/Finance'
import SpecialOrders from './pages/SpecialOrders'
import PrivateCommercial from './pages/PrivateCommercial'
import FreeDraw from './pages/FreeDraw'
import Jobs from './pages/Jobs'

function App() {
  const location = useLocation();

  // Debug route changes
  useEffect(() => {
    console.log('Route changed:', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: location.state,
      key: location.key
    });
  }, [location]);

  return (
    <CartProvider>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.SHOP} element={<ProductsPage />} />
          <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.PRODUCT_CATEGORY} element={<ProductsPage />} />
          <Route path="/product-tag/:tag" element={<ProductsPage />} />
          <Route path={ROUTES.BRAND} element={<ProductsPage />} />
          
          {/* Footer Links - Customer Services */}
          <Route path={ROUTES.CONTACT_FAQ} element={<ContactFaq />} />
          <Route path={ROUTES.TRACK_ORDER} element={<TrackOrder />} />
          <Route path={ROUTES.RETURNS} element={<Returns />} />
          <Route path={ROUTES.SHIPPING} element={<Shipping />} />
          <Route path={ROUTES.FINANCE} element={<Finance />} />
          
          {/* Footer Links - About Us */}
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.SPECIAL_ORDERS} element={<SpecialOrders />} />
          <Route path={ROUTES.PRIVATE_COMMERCIAL} element={<PrivateCommercial />} />
          <Route path={ROUTES.FREE_DRAW} element={<FreeDraw />} />
          
          {/* Footer Links - Discover More */}
          <Route path={ROUTES.JOBS} element={<Jobs />} />
          
          {/* Authentication & Checkout */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}

export default App
