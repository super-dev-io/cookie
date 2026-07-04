const { cookies, categories, brands } = require('../data/mockData');

const enrich = (cookie) => ({
  ...cookie,
  category: categories.find(c => c.id === cookie.categoryId) || null,
  brand:    brands.find(b => b.id === cookie.brandId) || null,
});

const getAll = (req, res) => {
  const { category, brand, inStock, sort } = req.query;

  let result = cookies.map(enrich);

  if (category) result = result.filter(c => c.category?.slug === category);
  if (brand)    result = result.filter(c => c.brandId === parseInt(brand));
  if (inStock !== undefined) result = result.filter(c => c.inStock === (inStock === 'true'));

  if (sort === 'price_asc')    result.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc')   result.sort((a, b) => b.price - a.price);
  if (sort === 'rating')       result.sort((a, b) => b.rating - a.rating);
  if (sort === 'name')         result.sort((a, b) => a.name.localeCompare(b.name));

  res.json({ cookies: result, total: result.length });
};

const getById = (req, res) => {
  const cookie = cookies.find(c => c.id === parseInt(req.params.id));
  if (!cookie) return res.status(404).json({ error: 'Cookie not found' });
  res.json(enrich(cookie));
};

module.exports = { getAll, getById };
