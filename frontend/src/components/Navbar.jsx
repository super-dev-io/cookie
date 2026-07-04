import React from 'react';

export default function Navbar({ activePage, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🍪</span>
        <span className="navbar-title">Cookie Inventory</span>
      </div>
      <div className="navbar-links">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'cookies',   label: 'Cookies'   },
          { id: 'brands',    label: 'Brands'    },
        ].map(({ id, label }) => (
          <button
            key={id}
            className={`nav-link ${activePage === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
