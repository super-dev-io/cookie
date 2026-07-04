import React from 'react';
import { useStats } from '../hooks/useCookies';

function StatCard({ label, value, sub, color }) {
  return (
    <div className="stat-card" style={{ '--accent': color }}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

export default function StatsPanel() {
  const { stats, loading, error } = useStats();

  if (loading) return <div className="loading-row"><div className="spinner" /><span>Loading stats…</span></div>;
  if (error)   return <div className="error-msg">⚠ Could not load stats</div>;
  if (!stats)  return null;

  return (
    <div>
      <div className="stats-grid">
        <StatCard label="Total Cookies"  value={stats.totalCookies}  color="#6366F1" />
        <StatCard label="In Stock"       value={stats.inStock}        sub={`${stats.outOfStock} out of stock`} color="#10B981" />
        <StatCard label="Avg Rating"     value={`${stats.avgRating}★`} color="#F59E0B" />
        <StatCard label="Avg Price"      value={`$${stats.avgPrice}`} color="#3B82F6" />
        <StatCard label="Total Reviews"  value={stats.totalReviews}   color="#EC4899" />
        <StatCard label="Price Range"    value={`$${stats.priceRange.min} – $${stats.priceRange.max}`} color="#8B5CF6" />
      </div>

      <div className="section-row">
        <div className="panel">
          <h3 className="panel-title">Top Rated</h3>
          <div className="top-rated-list">
            {stats.topRated.map((c, i) => (
              <div key={c.id} className="top-rated-item">
                <span className="rank">#{i + 1}</span>
                <span className="emoji">{c.emoji}</span>
                <span className="name">{c.name}</span>
                <span className="rating-badge">{c.rating}★</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title">By Category</h3>
          <div className="category-bars">
            {stats.byCategory.map(cat => (
              <div key={cat.category} className="bar-row">
                <span className="bar-icon">{cat.icon}</span>
                <span className="bar-label">{cat.category}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${(cat.count / stats.totalCookies) * 100}%`, background: cat.color }}
                  />
                </div>
                <span className="bar-count">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
