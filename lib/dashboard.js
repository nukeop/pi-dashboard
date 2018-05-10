require('isomorphic-fetch');
var blessed = require('blessed'),
    contrib = require('blessed-contrib'),
    screen = blessed.screen();

var drawDiskScreen = require('./disk').drawDiskScreen;
var drawNetworkScreen = require('./network').drawNetworkScreen;
var drawWeatherScreen = require('./weather').drawWeatherScreen;

function init() {
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  
  let carousel = new contrib.carousel([
    drawDiskScreen(screen),
    drawNetworkScreen(screen),
    drawWeatherScreen(screen)
  ], {
    screen: screen,
    interval: 7000,
    rotate: true
  });
  carousel.start();
}

module.exports = {
  init
};
