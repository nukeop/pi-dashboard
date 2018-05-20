var _ = require('lodash');
var blessed = require('blessed'),
    contrib = require('blessed-contrib');
var si = require('systeminformation');
const config = require('../config');
const view = require('./view');

class DiskView extends view.View {
  constructor(screen) {
    super(screen);
    this.labelTop = 'External disk usage';
    this.labelBottom = 'Disk space';
  }

  create() {
    this.grid = new contrib.grid({
      rows: 2,
      cols: 1,
      label: this.labelTop,
      screen: this.screen
    });

    this.gauge = this.grid.set(0, 0, 1, 1, contrib.gauge, {
      label: this.labelTop,
      stroke: 'red',
      fill: 'white'      
    });

    this.table = this.grid.set(1, 0, 1, 1, contrib.table, {
      label: this.labelBottom,
      width: '100%',
      height: '100%',
      columnWidth: [10, 15],
      fg: 'white',
      selectedBg: 'black'
    });

    si.fsSize(data => {
      let disk = _.find(data, {fs: config.monitoredDisk});
      this.gauge.setPercent(disk.use);
      
      this.table.setData({
	headers: ['Type', 'Space'],
	data: [
	  ['taken', (disk.used/(1024 * 1024 * 1024)).toFixed(2) + ' GB'],
	  ['free', ((disk.size - disk.used)/(1024 * 1024 * 1024)).toFixed(2) + ' GB'],
	  ['total', (disk.size/(1024 * 1024 * 1024)).toFixed(2) + ' GB']
	]
      });

      this.draw();
    });
  }

  draw() {
    this.screen.render();
  }

  destroy() {
    delete this;
  }
}

module.exports = DiskView;
