const { brands, cookies } = require('../data/mockData');

const getAll = (req, res) => {
  const result = brands.map(brand => ({
    ...brand,
    cookieCount: cookies.filter(c => c.brandId === brand.id).length,
    avgRating: (() => {
      const bc = cookies.filter(c => c.brandId === brand.id);
      if (!bc.length) return 0;
      return parseFloat((bc.reduce((s, c) => s + c.rating, 0) / bc.length).toFixed(1));
    })(),
  }));
  res.json(result);
};

const getById = (req, res) => {
  const brand = brands.find(b => b.id === parseInt(req.params.id));
  if (!brand) return res.status(404).json({ error: 'Brand not found' });
  const bc = cookies.filter(c => c.brandId === brand.id);
  res.json({
    ...brand,
    cookieCount: bc.length,
    avgRating: bc.length
      ? parseFloat((bc.reduce((s, c) => s + c.rating, 0) / bc.length).toFixed(1))
      : 0,
    cookies: bc.map(c => ({ id: c.id, name: c.name, emoji: c.emoji, price: c.price })),
  });
};

module.exports = { getAll, getById };
