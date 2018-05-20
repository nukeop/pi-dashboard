require('isomorphic-fetch');
var blessed = require('blessed'),
    screen = blessed.screen();

const Carousel = require('./carousel');
var EthereumView = require('./ethereum');
var DiskView = require('./disk');
var drawNetworkScreen = require('./network').drawNetworkScreen;
var drawWeatherScreen = require('./weather').drawWeatherScreen;

function init() {
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  let views = [
    new EthereumView(screen),
    new DiskView(screen)
  ];

  let carousel = new Carousel(views, {
    screen,
    interval: 3000
  });
  carousel.start();
}

module.exports = {
  init
};
