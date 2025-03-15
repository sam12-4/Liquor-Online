import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import TopBar from './TopBar'
import RouteDebugger from './RouteDebugger'

const Layout = () => {
  const location = useLocation();
  
  // Debug layout renders
  console.log('Layout rendering with path:', location.pathname);
  
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        {/* Using location.pathname as key forces a remount of the Outlet when the path changes */}
        <Outlet key={location.pathname} />
      </main>
      <Footer />
      <RouteDebugger />
    </div>
  )
}

export default Layout
