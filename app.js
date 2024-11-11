const express = require('express');
const bodyParser = require('body-parser');
const categoryRouter = require('./routes/categoryRouter');
const jokeRouter = require('./routes/jokeRouter');
const path = require('path');

const app = express();

// Sets EJS for viewing
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Routes
app.use('/jokebook', categoryRouter);
app.use('/jokebook', jokeRouter);

// Display index page
app.get('/', (req, res) => {
  res.render('index'); // Render the main page with EJS
});

// adding a new joke (POST)
app.post('/jokebook/joke/add', (req, res) => {
  const { category, setup, delivery } = req.body;

  if (!category || !setup || !delivery) {
    return res.status(400).send('Please fill out all fields');
  }


  const Joke = require('./models/joke');
  Joke.addJoke(category, setup, delivery)
    .then(() => res.redirect('/'))
    .catch(error => res.status(500).send(error.message));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

