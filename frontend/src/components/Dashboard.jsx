import React from 'react';
import StatsPanel from './StatsPanel';

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="page-hero">
        <h1 className="hero-title">Cookie Inventory Dashboard</h1>
        <p className="hero-sub">Real-time overview of your cookie product catalog</p>
      </div>
      <StatsPanel />
    </div>
  );
}
