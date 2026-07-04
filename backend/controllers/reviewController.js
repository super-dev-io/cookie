const { reviews, cookies } = require('../data/mockData');

const getAll = (req, res) => {
  const { cookieId, minRating } = req.query;
  let result = reviews;
  if (cookieId)   result = result.filter(r => r.cookieId === parseInt(cookieId));
  if (minRating)  result = result.filter(r => r.rating >= parseFloat(minRating));
  const enriched = result.map(r => ({
    ...r,
    cookie: cookies.find(c => c.id === r.cookieId)
      ? { id: cookies.find(c => c.id === r.cookieId).id, name: cookies.find(c => c.id === r.cookieId).name }
      : null,
  }));
  res.json(enriched);
};

const getById = (req, res) => {
  const review = reviews.find(r => r.id === parseInt(req.params.id));
  if (!review) return res.status(404).json({ error: 'Review not found' });
  res.json(review);
};

module.exports = { getAll, getById };
