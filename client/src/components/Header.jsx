import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const navigate = useNavigate()

  // Handle category navigation
  const handleCategoryClick = (categoryPath, subcat = null) => {
    let path = `/product-category/${categoryPath}`;
    if (subcat) {
      // Use consistent query parameter format
      path += `?za=${subcat}`;
    }
    console.log('Header - Navigating to:', path);
    // Use navigate with { replace: false } to ensure it adds to history stack
    navigate(path, { replace: false });
  };

  // Handle brand navigation
  const handleBrandClick = (brandName) => {
    const formattedBrand = brandName.toLowerCase().replace(/\s+/g, '-');
    const path = `/brand/${formattedBrand}`;
    console.log('Header - Navigating to brand:', path);
    // Use navigate with { replace: false } to ensure it adds to history stack
    navigate(path, { replace: false });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-fluid py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <h1 className="text-primary text-3xl font-bold font-serif">LIQUOR ONLINE</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              HOME
            </Link>
            <div className="relative group">
              <button 
                onClick={() => handleCategoryClick('wine')}
                className="nav-link flex items-center"
              >
                WINES <span className="ml-1">▼</span>
              </button>
              <div className="dropdown-menu">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm mb-2 uppercase">Types</h3>
                    <ul className="space-y-1">
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('wine', 'red')}
                          className="text-sm hover:text-primary"
                        >
                          red wines
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('wine', 'white')}
                          className="text-sm hover:text-primary"
                        >
                          white wines
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('wine', 'sparkling')}
                          className="text-sm hover:text-primary"
                        >
                          sparkling
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('wine', 'rose')}
                          className="text-sm hover:text-primary"
                        >
                          rose
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('wine', 'champagne')}
                          className="text-sm hover:text-primary"
                        >
                          champagne
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-2 uppercase">Varietals</h3>
                    <ul className="space-y-1">
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('wine', 'cabernet-sauvignon')}
                          className="text-sm hover:text-primary"
                        >
                          cabernet sauvignon
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('wine', 'malbec')}
                          className="text-sm hover:text-primary"
                        >
                          malbec
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('wine', 'chardonnay')}
                          className="text-sm hover:text-primary"
                        >
                          chardonnay
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('wine', 'sauvignon-blanc')}
                          className="text-sm hover:text-primary"
                        >
                          sauvignon blanc
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button 
                onClick={() => handleCategoryClick('spirits')}
                className="nav-link flex items-center"
              >
                SPIRITS <span className="ml-1">▼</span>
              </button>
              <div className="dropdown-menu">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm mb-2 uppercase">Types</h3>
                    <ul className="space-y-1">
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('spirits', 'vodka')}
                          className="text-sm hover:text-primary"
                        >
                          Vodka
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('spirits', 'whiskey')}
                          className="text-sm hover:text-primary"
                        >
                          Whiskey
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('spirits', 'tequila')}
                          className="text-sm hover:text-primary"
                        >
                          Tequila
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('spirits', 'rum')}
                          className="text-sm hover:text-primary"
                        >
                          Rum
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-2 uppercase">Brands</h3>
                    <ul className="space-y-1">
                      <li>
                        <button 
                          onClick={() => handleBrandClick('jack-daniels')}
                          className="text-sm hover:text-primary"
                        >
                          Jack Daniel's
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleBrandClick('crown-royal')}
                          className="text-sm hover:text-primary"
                        >
                          Crown Royal
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleBrandClick('818-tequila')}
                          className="text-sm hover:text-primary"
                        >
                          818 Tequila
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button 
                onClick={() => handleCategoryClick('beer')}
                className="nav-link flex items-center"
              >
                BEER & MORE <span className="ml-1">▼</span>
              </button>
              <div className="dropdown-menu">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="font-medium text-sm mb-2 uppercase">Types</h3>
                    <ul className="space-y-1">
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('beer', 'domestic')}
                          className="text-sm hover:text-primary"
                        >
                          domestic beer
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('beer', 'imported')}
                          className="text-sm hover:text-primary"
                        >
                          imported beer
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleCategoryClick('cider')}
                          className="text-sm hover:text-primary"
                        >
                          Cider
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <Link to="/product-tag/limited-editions" className="nav-link flex items-center">
                SPECIAL PRODUCTS <span className="ml-1">▼</span>
              </Link>
              <div className="dropdown-menu">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm mb-2 uppercase">Limited Edition</h3>
                    <ul className="space-y-1">
                      <li><Link to="/product-tag/wine" className="text-sm hover:text-primary">Wine</Link></li>
                      <li><Link to="/product-tag/tequila" className="text-sm hover:text-primary">Tequila</Link></li>
                      <li><Link to="/product-tag/cognac" className="text-sm hover:text-primary">Cognac</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-2 uppercase">Over the Top</h3>
                    <ul className="space-y-1">
                      <li><Link to="/product-tag/new-releases" className="text-sm hover:text-primary">New Releases</Link></li>
                      <li><Link to="/product-tag/rare-exceptional" className="text-sm hover:text-primary">Rare & Exceptional</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Side - Login & Cart */}
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-neutral-dark font-medium hover:text-primary">
              LOGIN / REGISTER
            </Link>

            {/* Search button */}
            <button className="p-2 text-neutral-dark hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 text-neutral-dark hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </Link>

            {/* Shopping Cart */}
            <Link to="/cart" className="relative p-2 text-neutral-dark hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-neutral-dark hover:text-primary"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-2">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block py-2 nav-link">HOME</Link>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('wine')}
                  className="block py-2 nav-link w-full text-left"
                >
                  WINES
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('spirits')}
                  className="block py-2 nav-link w-full text-left"
                >
                  SPIRITS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('beer')}
                  className="block py-2 nav-link w-full text-left"
                >
                  BEER & MORE
                </button>
              </li>
              <li>
                <Link to="/product-tag/limited-editions" className="block py-2 nav-link">SPECIAL PRODUCTS</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
