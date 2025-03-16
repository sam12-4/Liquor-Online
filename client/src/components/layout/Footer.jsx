import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-muted">
      <div className="container-fluid py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Contact Us */}
          <div>
            <h3 className="text-lg font-medium text-neutral-dark mb-4 uppercase">Contact Us</h3>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex flex-col">
                <span className="font-bold">Head Office:</span>
                <span>4808 50 St.,</span>
                <span>Red Deer, AB</span>
                <span>Canada T4N 1X5</span>
              </p>
              <p className="flex flex-col">
                <span className="font-bold">Tel:</span>
                <span>1 833 306 SELL</span>
              </p>
              <p className="flex flex-col">
                <span className="font-bold">Email:</span>
                <a href="mailto:admin@liquoronline.ca" className="hover:text-primary">admin@liquoronline.ca</a>
              </p>

              {/* Social Media */}
              <div className="flex space-x-4 mt-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-dark hover:text-primary transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-dark hover:text-primary transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-dark hover:text-primary transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 - Customer Services */}
          <div>
            <h3 className="text-lg font-medium text-neutral-dark mb-4 uppercase">Customer Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/contact-faq" className="hover:text-primary">Contact & FAQ</Link></li>
              <li><Link to="/track-order" className="hover:text-primary">Track Your Order</Link></li>
              <li><Link to="/returns" className="hover:text-primary">Returns & Refunds</Link></li>
              <li><Link to="/shipping" className="hover:text-primary">Shipping & Delivery</Link></li>
              <li><Link to="/finance" className="hover:text-primary">Interest Free Finance</Link></li>
            </ul>
          </div>

          {/* Column 3 - About Us */}
          <div>
            <h3 className="text-lg font-medium text-neutral-dark mb-4 uppercase">About Us</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link to="/special-orders" className="hover:text-primary">Special Orders</Link></li>
              <li><Link to="/product-tag/special-allocations" className="hover:text-primary">Special Allocations</Link></li>
              <li><Link to="/private-and-commercial" className="hover:text-primary">Private Functions</Link></li>
              <li><Link to="/private-and-commercial" className="hover:text-primary">Commercial</Link></li>
              <li><Link to="/free_draw" className="hover:text-primary">Free Draw</Link></li>
              <li><Link to="/product-tag/limited-time-offers" className="hover:text-primary">Limited Time Offers</Link></li>
            </ul>
          </div>

          {/* Column 4 - Discover More */}
          <div>
            <h3 className="text-lg font-medium text-neutral-dark mb-4 uppercase">Discover More</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="https://www.facebook.com" className="hover:text-primary">Facebook</a></li>
              <li><a href="https://www.instagram.com" className="hover:text-primary">Instagram</a></li>
              <li><a href="https://www.tiktok.com" className="hover:text-primary">TikTok</a></li>
              <li><Link to="/jobs" className="hover:text-primary">Jobs</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4">
        <div className="container-fluid flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            Copyright © {new Date().getFullYear()} Liquor Online.
          </div>
          <div className="flex space-x-2">
            <img src="https://web-assets.same.dev/2392223567/4134181266.webp" alt="Payment Methods" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
