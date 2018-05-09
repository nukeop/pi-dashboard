var blessed = require('blessed'),
    contrib = require('blessed-contrib'),
    screen = blessed.screen();

var drawDiskScreen = require('./disk').drawDiskScreen;
var drawNetworkScreen = require('./network').drawNetworkScreen;

function init() {
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  
  let carousel = new contrib.carousel([drawDiskScreen(screen), drawNetworkScreen(screen)], {
    screen: screen,
    interval: 3000,
    rotate: true
  });
  carousel.start();
}

module.exports = {
  init
};
