var config = require('../../config');

let openWeatherMapUrl = 'http://api.openweathermap.org/data/2.5/find?units=metric&appid=' + config.openWeatherMapApiKey + '&q=';

function getWeather() {
  let url = openWeatherMapUrl + encodeURIComponent(config.weatherLocation);  
  return fetch(url)
    .then(results => results.json());
}

module.exports = {
  getWeather
};
