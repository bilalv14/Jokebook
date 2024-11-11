const Category = require('../models/category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};