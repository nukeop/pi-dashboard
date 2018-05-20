var _ = require('lodash');
var blessed = require('blessed'),
    contrib = require('blessed-contrib');
var si = require('systeminformation');
var internalIp = require('internal-ip');

const utils = require('./utils');
const view = require('./view');

class NetworkView extends view.View {
  constructor(screen) {
    super(screen);
  }

  create() {
    this. label = "Network";
    this. grid = new contrib.grid({
      rows: 1,
      cols: 1,
      label: this.label,
      screen: this.screen
    });

    this.text = this.grid.set(0, 0, 1, 1, blessed.box, {
      align: 'center',
      label: this.label
    });
    this.ip = internalIp.v4.sync();
    this.text.setContent(`\n\n\n\nLocal IP: ${this.ip}`); 
  }

  draw() {
    this.screen.render();
  }

  destroy() {
    delete this;
  }
}

module.exports = NetworkView;
