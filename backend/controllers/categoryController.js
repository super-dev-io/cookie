const { categories, cookies } = require('../data/mockData');

const getAll = (req, res) => {
  const result = categories.map(cat => ({
    ...cat,
    cookieCount: cookies.filter(c => c.categoryId === cat.id).length,
  }));
  res.json(result);
};

const getById = (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id));
  if (!category) return res.status(404).json({ error: 'Category not found' });
  res.json({
    ...category,
    cookieCount: cookies.filter(c => c.categoryId === category.id).length,
  });
};

module.exports = { getAll, getById };
