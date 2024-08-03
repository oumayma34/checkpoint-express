const express = require('express');
const app = express();
const port = 3000;

const Work = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay(); 
  const hour = date.getHours();

  // Check if it's a weekend or outside working hours
  if (dayOfWeek === 0 || dayOfWeek === 6 || hour < 9 || hour >= 22) {
    res.send('<body style="background-image: url(\'/images/getty_941183656_399345.jpg\'); background-size: cover; background-position: center; display: flex; justify-content: left; align-items: center; height: 100vh; margin: 0;"> <h1 style="color: yellow; text-align: left; max-width: 50%;">Sorry, the web application is only available during working hours (Monday to Friday, 9am to 5pm).</h1></body>');
  } else {
    next();
  }
};

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', Work, (req, res) => {
  res.render('home');
});

app.get('/services', Work, (req, res) => {
  res.render('services');
});

app.get('/contact', Work, (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});