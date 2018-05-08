var _ = require('lodash');
var blessed = require('blessed'),
    contrib = require('blessed-contrib');
var si = require('systeminformation');
var config = require('../config');

function draw(screen) {
  return () => {
    let label = "External disk usage";
    let label2 = "Disk space";
    
    let grid = new contrib.grid({
      rows: 2,
      cols: 1,
      label,
      screen: screen
    });

    let gauge = grid.set(0, 0, 2, 1, contrib.gauge, {
      label,
      stroke: 'red',
      fill: 'white'      
    });

    let table = grid.set(1, 0, 1, 1, contrib.table, {
      label: label2,
      width: '100%',
      height: '100%',
      columnWidth: [10, 15],
      fg: 'white',
      selectedBg: 'black'
    });

    si.fsSize(data => {
      let disk = _.find(data, {fs: config.monitoredDisk});
      gauge.setPercent(disk.use);
      
      table.setData({
	headers: ['Type', 'Space'],
	data: [
	  ['taken', (disk.used/(1024 * 1024 * 1024)).toFixed(2) + ' GB'],
	  ['free', ((disk.size - disk.used)/(1024 * 1024 * 1024)).toFixed(2) + ' GB'],
	  ['total', (disk.size/(1024 * 1024 * 1024)).toFixed(2) + ' GB']
	]
      });

      gauge.screen.render();
    });
    
  };  
}

module.exports = {
  drawDiskScreen: draw
};
