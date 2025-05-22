// src/shared/components/layout/ProtectedLayout.tsx
import { Button } from '@/components/ui/button';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// If you use ShadCN UI components, import them here


const ProtectedLayout: React.FC = () => {
  const navigate = useNavigate();

  // A simple logout handler: clear the token and navigate to login
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My E-commerce</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow mt-6">
        <div className="max-w-7xl mx-auto py-4 px-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} My E-commerce. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProtectedLayout;