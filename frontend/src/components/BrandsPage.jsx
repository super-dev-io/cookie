import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function BrandsPage() {
  const [brands,  setBrands]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    api.get('/brands')
      .then(res  => setBrands(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-center"><div className="spinner large" /><p>Loading brands…</p></div>;
  if (error)   return <div className="error-box">⚠ {error}</div>;

  return (
    <div className="brands-page">
      <div className="page-hero">
        <h1 className="hero-title">Our Brands</h1>
        <p className="hero-sub">{brands.length} trusted cookie brands worldwide</p>
      </div>

      <div className="brands-grid">
        {brands.map(brand => (
          <div key={brand.id} className="brand-card">
            <div className="brand-logo">{brand.logo}</div>
            <h3 className="brand-name">{brand.name}</h3>
            <p className="brand-tagline">"{brand.tagline}"</p>
            <div className="brand-meta">
              <span>🌍 {brand.country}</span>
              <span>📅 Est. {brand.founded}</span>
            </div>
            <div className="brand-stats">
              <div className="brand-stat">
                <div className="brand-stat-value">{brand.cookieCount}</div>
                <div className="brand-stat-label">Cookies</div>
              </div>
              <div className="brand-stat">
                <div className="brand-stat-value">{brand.avgRating}★</div>
                <div className="brand-stat-label">Avg Rating</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
