const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

/*==================
Expressの初期設定（必須）
===================*/
const app = express();
const port = process.env.PORT || 3000;

/*==================
hbsの初期設定（必須）
===================*/
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));
app.use(express.static(path.join(__dirname, '../public')));

const name = 'Yoko Saka';
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name,
    description: 'Use this site to get your weather!',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name,
    description: 'This app uses weather API and mapbox API.',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name,
    description: 'This is Help page.',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide address.',
    });
  }
  geocode(
    req.query.address,
    (error, { longtitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longtitude, latitude, (error, data) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: data,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Not found',
    name,
    description: 'Sorry. Not Found.',
  });
});

// app.listen(port, () =>
//   console.log(`Example app listening at http://localhost:${port}`)
// );

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
