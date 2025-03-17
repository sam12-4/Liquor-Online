import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/authActions';
import { setAuthToken } from './utils/setAuthToken';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';
import ScrollToTop from './components/ScrollToTop';

// Routes
import { routes } from './routes';

// CSS
import './index.css';

// Check for token on initial load
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

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
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
