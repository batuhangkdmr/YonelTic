import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import { Paper } from '@mui/material';
import ScrollToTop from './ScrollToTop';
import WhatsAppFloatButton from './components/WhatsAppFloatButton';
import Login from './pages/Admin/Login';
import AdminProducts from './pages/Admin/Products';
import AdminLayout from './components/AdminLayout';
import PrivateRoute from './components/PrivateRoute';
import AdminCategories from './pages/Admin/Categories';
import Register from './pages/Admin/Register';
import SliderManagement from './pages/admin/SliderManagement';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f8f9fa',
      paper: '#fff',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    text: {
      primary: '#222',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '-1px',
    },
    h5: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8f9fa',
        },
      },
    },
  },
});

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app" style={{ width: '100vw', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {!isAdminRoute && <Navbar />}
      <main style={{ width: '100vw', flex: 1 }}>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <AdminCategories />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/slider" element={<PrivateRoute><AdminLayout><SliderManagement /></AdminLayout></PrivateRoute>} />

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <WhatsAppFloatButton />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <div style={{ width: '100vw', minHeight: '100vh', background: theme.palette.background.default, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
          <Router>
            <AppContent />
          </Router>
        </div>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default App;
