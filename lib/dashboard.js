require('isomorphic-fetch');
var blessed = require('blessed'),
    screen = blessed.screen();

const Carousel = require('./carousel');
const EthereumView = require('./ethereum');
const DiskView = require('./disk');
const NetworkView = require('./network');
const WeatherView = require('./weather');

function init() {
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  let views = [
    new WeatherView(screen),
    new EthereumView(screen),
    new DiskView(screen),
    new NetworkView(screen)
  ];

  let carousel = new Carousel(views, {
    screen,
    interval: 7000
  });
  carousel.start();
}

module.exports = {
  init
};
