import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, matchPath } from 'react-router-dom';

const RouteDebugger = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [isMinimized, setIsMinimized] = useState(false);
  const [routeHistory, setRouteHistory] = useState([]);
  const [currentComponent, setCurrentComponent] = useState('Unknown');

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const subcategory = queryParams.get('za') || queryParams.get('a-zzz');

  // Determine current component based on route
  useEffect(() => {
    // Define route patterns and their corresponding component names
    const routes = [
      { pattern: '/', componentName: 'Home' },
      { pattern: '/shop', componentName: 'ProductsPage' },
      { pattern: '/product/:productId', componentName: 'ProductDetail' },
      { pattern: '/cart', componentName: 'Cart' },
      { pattern: '/product-category/:category', componentName: 'ProductsPage (Category)' },
      { pattern: '/product-tag/:tag', componentName: 'ProductsPage (Tag)' },
      { pattern: '/brand/:brand', componentName: 'ProductsPage (Brand)' },
      { pattern: '/contact-faq', componentName: 'ContactFaq' },
      { pattern: '/track-order', componentName: 'TrackOrder' },
      { pattern: '/returns', componentName: 'Returns' },
      { pattern: '/shipping', componentName: 'Shipping' },
      { pattern: '/finance', componentName: 'Finance' },
      { pattern: '/about', componentName: 'About' },
      { pattern: '/contact', componentName: 'Contact' },
      { pattern: '/special-orders', componentName: 'SpecialOrders' },
      { pattern: '/private-and-commercial', componentName: 'PrivateCommercial' },
      { pattern: '/free_draw_2024', componentName: 'FreeDraw' },
      { pattern: '/jobs', componentName: 'Jobs' },
      { pattern: '/login', componentName: 'Login' },
      { pattern: '/register', componentName: 'Register' },
      { pattern: '/checkout', componentName: 'Checkout' },
    ];

    // Find matching route
    for (const route of routes) {
      const match = matchPath({ path: route.pattern }, location.pathname);
      if (match) {
        setCurrentComponent(route.componentName);
        break;
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    console.log('RouteDebugger - Current location:', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      params,
      component: currentComponent
    });

    // Add to history (limit to last 5)
    setRouteHistory(prev => {
      const newHistory = [
        { 
          path: location.pathname, 
          search: location.search,
          component: currentComponent,
          timestamp: new Date().toLocaleTimeString()
        },
        ...prev
      ];
      return newHistory.slice(0, 5);
    });
  }, [location, params, currentComponent]);

  const handleManualNavigation = (path) => {
    console.log('RouteDebugger - Manually navigating to:', path);
    navigate(path);
  };

  const handleClearHistory = () => {
    setRouteHistory([]);
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 bg-white border border-gray-300 p-4 m-4 rounded shadow-lg z-50 max-w-md route-debugger">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Route Debugger</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
          >
            {isMinimized ? 'Expand' : 'Minimize'}
          </button>
          <button 
            onClick={() => document.querySelector('.route-debugger')?.remove()}
            className="px-2 py-1 bg-red-500 text-white text-xs rounded"
          >
            Close
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="mb-2 p-2 bg-gray-100 rounded">
            <div><strong>Path:</strong> {location.pathname}</div>
            <div><strong>Search:</strong> {location.search || '(none)'}</div>
            <div><strong>Component:</strong> {currentComponent}</div>
            <div><strong>Category:</strong> {params.category || '(none)'}</div>
            <div><strong>Subcategory:</strong> {subcategory || '(none)'}</div>
            <div><strong>Tag:</strong> {params.tag || '(none)'}</div>
            <div><strong>Brand:</strong> {params.brand || '(none)'}</div>
          </div>

          <div className="mb-2">
            <h4 className="font-semibold">Route History:</h4>
            <div className="max-h-32 overflow-y-auto text-xs">
              {routeHistory.length > 0 ? (
                <ul className="border rounded divide-y">
                  {routeHistory.map((route, index) => (
                    <li key={index} className="p-1 hover:bg-gray-50">
                      <span className="text-gray-500">{route.timestamp}</span>: 
                      <span className="font-mono ml-1">{route.path}{route.search}</span>
                      <span className="text-xs text-blue-500 ml-1">({route.component})</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No history yet</p>
              )}
            </div>
            {routeHistory.length > 0 && (
              <button 
                onClick={handleClearHistory}
                className="text-xs text-gray-500 hover:text-gray-700 mt-1"
              >
                Clear History
              </button>
            )}
          </div>

          <div className="mb-2">
            <h4 className="font-semibold">Test Navigation:</h4>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button 
                onClick={() => handleManualNavigation('/product-category/spirits')}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
              >
                Spirits
              </button>
              <button 
                onClick={() => handleManualNavigation('/product-category/wine')}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
              >
                Wine
              </button>
              <button 
                onClick={() => handleManualNavigation('/product-category/beer')}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
              >
                Beer
              </button>
              <button 
                onClick={() => handleManualNavigation('/about')}
                className="px-2 py-1 bg-green-500 text-white text-xs rounded"
              >
                About
              </button>
              <button 
                onClick={() => handleManualNavigation('/contact')}
                className="px-2 py-1 bg-green-500 text-white text-xs rounded"
              >
                Contact
              </button>
              <button 
                onClick={() => handleManualNavigation('/shop')}
                className="px-2 py-1 bg-green-500 text-white text-xs rounded"
              >
                Shop (All)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RouteDebugger; 