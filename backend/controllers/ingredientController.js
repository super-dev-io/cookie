const { ingredients, cookies } = require('../data/mockData');

const getAll = (req, res) => {
  const { category } = req.query;
  let result = ingredients;
  if (category) result = result.filter(i => i.category.toLowerCase() === category.toLowerCase());
  res.json(result);
};

const getById = (req, res) => {
  const ingredient = ingredients.find(i => i.id === parseInt(req.params.id));
  if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });
  const usedIn = cookies
    .filter(c => c.ingredientIds.includes(ingredient.id))
    .map(c => ({ id: c.id, name: c.name, emoji: c.emoji }));
  res.json({ ...ingredient, usedIn });
};

module.exports = { getAll, getById };
