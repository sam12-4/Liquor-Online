import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import ProductsPage from './pages/ProductsPage'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Layout from './components/Layout'
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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product-category/:category" element={<ProductsPage />} />
        <Route path="/product-tag/:tag" element={<ProductsPage />} />
        <Route path="/brand/:brand" element={<ProductsPage />} />
        
        {/* Footer Links - Customer Services */}
        <Route path="/contact-faq" element={<ContactFaq />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/finance" element={<Finance />} />
        
        {/* Footer Links - About Us */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/special-orders" element={<SpecialOrders />} />
        <Route path="/private-and-commercial" element={<PrivateCommercial />} />
        <Route path="/free_draw_2024" element={<FreeDraw />} />
        
        {/* Footer Links - Discover More */}
        <Route path="/jobs" element={<Jobs />} />
        
        {/* Authentication & Checkout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App
