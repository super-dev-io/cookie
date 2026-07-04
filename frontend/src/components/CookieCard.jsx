import React from 'react';

function Stars({ rating }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  return (
    <span className="stars">
      {'★'.repeat(full)}
      {half ? '½' : ''}
      <span className="star-value">{rating}</span>
    </span>
  );
}

export default function CookieCard({ cookie }) {
  const { name, emoji, price, weight, rating, reviewCount, inStock, category, brand, description, tags } = cookie;

  return (
    <div className={`cookie-card ${!inStock ? 'out-of-stock' : ''}`}>
      <div className="card-header">
        <span className="cookie-emoji">{emoji}</span>
        {!inStock && <span className="badge badge-out">Out of Stock</span>}
        {inStock  && <span className="badge badge-in">In Stock</span>}
      </div>

      <div className="card-body">
        <h3 className="cookie-name">{name}</h3>
        <p className="cookie-desc">{description}</p>

        <div className="meta-row">
          {category && (
            <span className="category-chip" style={{ background: category.color + '22', color: category.color }}>
              {category.icon} {category.name}
            </span>
          )}
          {brand && <span className="brand-chip">{brand.logo} {brand.name}</span>}
        </div>

        <div className="rating-row">
          <Stars rating={rating} />
          <span className="review-count">({reviewCount} reviews)</span>
        </div>

        {tags && tags.length > 0 && (
          <div className="tags-row">
            {tags.map(t => <span key={t} className="tag">#{t}</span>)}
          </div>
        )}
      </div>

      <div className="card-footer">
        <span className="price">${price}</span>
        <span className="weight">{weight}</span>
      </div>
    </div>
  );
}
