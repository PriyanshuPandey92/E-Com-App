import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Loading from '../components/Loading';
import PublicLayout from '../components/PublicLayout';
import ProtectedLayout from '../components/ProtectedLayout';
import Checkout from '@/modules/orders/components/Checkout';
import OrderHistory from '@/modules/orders/components/OrderHistory';

// Lazy loaded modules
const Home = React.lazy(() => import('../../modules/products/components/ProductPage'));
const Login = React.lazy(() => import('../../modules/auth/components/Login'));
//const Cart = React.lazy(() => import('../../modules/cart/components/Cart'));
//const Orders = React.lazy(() => import('../modules/orders/components/Orders'));
// ... add other lazy routes

// A mock authentication check (replace with your actual auth logic)
const isAuthenticated = () => Boolean(localStorage.getItem('access_token'));

const AppRoutes = () => (
  <HelmetProvider>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Route>

          {/* Protected Routes */}
          <Route
            element={
              isAuthenticated() ? (
                <ProtectedLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            {/* <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} /> */}
            {/* Add other protected routes */}
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />  
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);

export default AppRoutes;