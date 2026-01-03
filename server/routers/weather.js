
const express = require('express');
const router = express.Router();
const axios = require('axios');

const { Weather } = require('../db');

const oneHour = 60 * 60 * 1000;


const getWeather = async (city) => {
  const options = {
    method: 'GET',
    url: 'http://api.weatherapi.com/v1/current.json',
    params: {
      key: process.env['WEATHER_API_KEY'],
      q: city,
    }
  };

  const weather = await axios(options);
  return weather.data;
};


router.get('/loc/:location', (req, res) => {
  const { location } = req.params;
  Weather.findOne({ location }) // db searches for weather based on location
    .then(weather => {
      if (weather) { // if weather found,
        if (((new Date()) - weather.updatedAt) >= oneHour) { // if it's been more than one hour since last update, do api call
          getWeather(location)
            .then(({ current: { condition, temp_f }}) => {
              Weather.findOneAndUpdate({ location }, { condition: condition.text.toLowerCase(), temperature: temp_f }, { new: true })
                .then(newWeather => {
                  res.status(200).send(newWeather);
                })
                .catch(err => {
                  console.error('Unable to update weather from server: ', err);
                  res.sendStatus(500);
                });
            })
            .catch(err => {
              console.error('Unable to retrieve from weather api: ', err);
              res.sendStatus(500);
            });
        } else { // otherwise send back the data as is
          res.status(200).send(weather);
        }
      } else { // if it isn't found,
        getWeather(location) // make a call to the api and create a new weather instance
          .then(({ current: {condition, temp_f }}) => {
            Weather.create({ location, condition: condition.text.toLowerCase(), temperature: temp_f })
              .then(newWeather => { // then send that back
                res.status(200).send(newWeather);
              })
              .catch(err => {
                console.error('Unable to create new instance of weather in database: ', err);
                res.sendStatus(500);
              });
          })
          .catch(err => {
            console.error('Unable to retrieve from weather api: ', err);
            res.sendStatus(500);
          });
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