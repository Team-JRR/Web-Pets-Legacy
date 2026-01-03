
const express = require('express');
const router = express.Router();
const axios = require('axios');

const { Weather } = require('../db');


const options = {
  method: 'GET',
  url: 'http://api.weatherapi.com/v1/current.json',
  params: {
    key: process.env['WEATHER_API_KEY'],
    q: 'New Orleans',
  }
};

const getWeather = async () => {
  const weather = await axios(options);
  return weather.data;
};


router.get('/api', (req, res) => {
  getWeather()
    .then(weatherInfo => {
      // res.status(200).send(weatherInfo);
      /*
        * I think this is pretty overengineered but I'm not sure how else to do it right now
        * gonna have a get root request to JUST get from database without doing all this... mess
        * commented out for now because it's not finished and I need to work on it more
      */
      const { location, current: { condition, temp_f }} = weatherInfo;

      Weather.findOne({ location: location.name })
        .then(weather => {
          if (weather) {
            Weather.findOneAndUpdate({ location: location.name }, { condition: condition.text.toLowerCase(), temperature: temp_f }, { new: true })
              .then(weatherDB => {
                res.status(200).send(weatherDB);
              })
              .catch(err => {
                console.error('Could not update weather entry: ', err);
                res.sendStatus(500);
              });
          } else {
            Weather.create({ location: location.name, condition: condition.text.toLowerCase(), temperature: temp_f })
              .then(weatherDB => {
                res.status(200).send(weatherDB);
              })
              .catch(err => {
                console.error('Could not create weather entry: ', err);
                res.sendStatus(500);
              });
          }
        })
        .catch(err => {
          console.error('Unable to find weather information in database: ', err);
          res.sendStatus(500);
        });
    })
    .catch(err => {
      console.error('Unable to retrieve from weather api on server: ', err);
      res.sendStatus(500);
    });
});

router.get('/loc/:location', (req, res) => {
  const { location } = req.params;
  Weather.findOne({ location })
    .then(weather => {
      if (weather) {
        res.status(200).send(weather);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      console.error('Unable to retrieve weather from database: ', err);
      res.sendStatus(500);
    });
});

/*
  * "Sunny" or "Clear" = sunny background
  * includes the word "cloudy" = cloudy background
  * "overcast", "mist", "fog" = overcast background
  * includes "sleet", "snow", "ice", "blizzard" = snowy background
  * includes "rain" or "drizzle" = rainy background
*/

module.exports = router;