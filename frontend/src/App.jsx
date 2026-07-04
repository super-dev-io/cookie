import React, { useState } from 'react';
import Navbar     from './components/Navbar';
import Dashboard  from './components/Dashboard';
import CookieList from './components/CookieList';
import BrandsPage from './components/BrandsPage';

export default function App() {
  const [page, setPage] = useState('dashboard');

  const renderPage = () => {
    switch (page) {
      case 'cookies':   return <CookieList />;
      case 'brands':    return <BrandsPage />;
      default:          return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Navbar activePage={page} onNavigate={setPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}
