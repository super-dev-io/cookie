const { allergens, cookies } = require('../data/mockData');

const getAll = (req, res) => {
  const result = allergens.map(a => ({
    ...a,
    affectedCookies: cookies.filter(c => c.allergenIds.includes(a.id)).length,
  }));
  res.json(result);
};

const getById = (req, res) => {
  const allergen = allergens.find(a => a.id === parseInt(req.params.id));
  if (!allergen) return res.status(404).json({ error: 'Allergen not found' });
  const affected = cookies
    .filter(c => c.allergenIds.includes(allergen.id))
    .map(c => ({ id: c.id, name: c.name, emoji: c.emoji }));
  res.json({ ...allergen, affected });
};

module.exports = { getAll, getById };
