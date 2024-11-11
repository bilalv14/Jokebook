const Joke = require('../models/joke');

exports.getJokesByCategory = async (req, res) => {
  const { category } = req.params;
  const { limit } = req.query;
  try {
    const jokes = await Joke.getJokesByCategory(category, limit);
    res.json(jokes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.addJoke = async (req, res) => {
  const { category, setup, delivery } = req.body;
  if (!category || !setup || !delivery) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  try {
    const joke = await Joke.addJoke(category, setup, delivery);
    res.json(joke);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
