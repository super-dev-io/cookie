import React, { useState, useEffect } from 'react';
import { useCookies, useCategories } from '../hooks/useCookies';
import CookieCard from './CookieCard';

export default function CookieList() {
  const { cookies, loading, error } = useCookies();
  const { categories } = useCategories();

  const [searchTerm,      setSearchTerm]      = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy,          setSortBy]          = useState('name');
  const [filteredCookies, setFilteredCookies] = useState([]);

  useEffect(() => {
    if (!Array.isArray(cookies)) return;

    let result = cookies.filter(cookie => {
      const matchesSearch =
        cookie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cookie.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || cookie.category?.slug === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'name')       result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'price_asc')  result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating')     result.sort((a, b) => b.rating - a.rating);

    setFilteredCookies(result);
  }, [searchTerm, selectedCategory, sortBy, cookies]);

  if (loading) {
    return (
      <div className="loading-center">
        <div className="spinner large" />
        <p>Loading cookies…</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-box">⚠ {error}</div>;
  }

  return (
    <div className="cookie-list-page">
      <div className="list-header">
        <h2 className="page-title">🍪 Cookie Inventory</h2>
        <span className="result-count">{filteredCookies.length} results</span>
      </div>

      <div className="filters-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or description…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select
          className="filter-select"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.slug}>{cat.icon} {cat.name}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="name">Sort: Name</option>
          <option value="rating">Sort: Rating</option>
          <option value="price_asc">Sort: Price ↑</option>
          <option value="price_desc">Sort: Price ↓</option>
        </select>
      </div>

      {/* BUG 2: renders `cookies` (the full list) instead of `filteredCookies` (the filtered result).
          The filter logic above runs correctly and updates `filteredCookies` state, but this
          JSX still uses the original `cookies` variable, so search and category filters
          appear to have no effect. */}
      {!Array.isArray(cookies) || cookies.length === 0 ? (
        <div className="empty-state">
          <span>🔍</span>
          <p>No cookies match your search.</p>
        </div>
      ) : (
        <div className="cookie-grid">
          {cookies.map(cookie => (
            <CookieCard key={cookie.id} cookie={cookie} />
          ))}
        </div>
      )}
    </div>
  );
}
