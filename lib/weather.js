var _ = require('lodash');
var blessed = require('blessed'),
    contrib = require('blessed-contrib');

const config = require('../config');
const view = require('./view');
const weather = require('./services/weather');

class WeatherView extends view.View {
  constructor(screen) {
    super(screen);
  }

  create() {
    this.label = config.weatherLocation;
    this.grid = new contrib.grid({
      rows: 9,
      cols: 1,
      label: this.label,
      screen: this.screen
    });

    this.temperatureText = this.grid.set(0, 0, 3, 1, blessed.box, {
      align: 'center',
      label: `Temperature for ${config.weatherLocation}`
    });
    
    this.windText = this.grid.set(3, 0, 3, 1, blessed.box, {
      align: 'center',
      label: 'Wind'
    });

    this.skyText = this.grid.set(6, 0, 3, 1, blessed.box, {
      align: 'center',
      label: 'Sky'
    });

    weather.getWeather()
      .then(data => {
	let weatherData = _.head(data.list);

	this.temperatureText.setContent(weatherData.main.temp + ' C');
	this.windText.setContent(weatherData.wind.speed + ' m/s');
	this.skyText.setContent(_.get(_.head(weatherData.weather), 'main'));
	
	this.draw();
      })
      .catch(err => {});
  }

  draw() {
    this.screen.render();
  }

  destroy() {
    delete this;
  }
}

module.exports = WeatherView;
