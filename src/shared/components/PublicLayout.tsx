
import { Outlet } from 'react-router-dom';
import Header from './Header';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">My E-commerce</h1>
        </div>
      </header> */}
      <Header/>

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
            &copy; {new Date().getFullYear()} My E-commerce. All rights reserved @ Brain Mentors Pvt Ltd.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;