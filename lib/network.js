var _ = require('lodash');
var blessed = require('blessed'),
    contrib = require('blessed-contrib');
var si = require('systeminformation');
var internalIp = require('internal-ip');

var utils = require('./utils');

var netData = [Array(30).fill(0), Array(30).fill(0)];
function updateNetChart(data, sparkline) {
  var rx_sec = Math.max(0, data.rx_sec);
  var tx_sec = Math.max(0, data.tx_sec);

  netData[0].shift();
  netData[0].push(rx_sec);

  netData[1].shift();
  netData[1].push(tx_sec);
  
  rx_label = 'Receiving:      ' +
    utils.humanFileSize(rx_sec) +
    '/s \nTotal received: ' +
    utils.humanFileSize(data.rx);

  tx_label = 'Transferring:      ' +
    utils.humanFileSize(tx_sec) +
    '/s \nTotal transferred: ' +
    utils.humanFileSize(data.tx);

  if (!sparkline.parent) {
    clearInterval();
    return;
  }
  
  sparkline.setData([rx_label, tx_label], netData);

  sparkline.screen.render();
}

function draw(screen) {
  return () => {
    let label = "Network";
    let grid = new contrib.grid({
      rows: 8,
      cols: 1,
      label,
      screen: screen
    });

    let text = grid.set(0, 0, 2, 1, blessed.box, {
      align: 'center',
      label
    });
    let ip = internalIp.v4.sync();
    text.setContent(`Local IP: ${ip}`);

    let sparkline = grid.set(2, 0, 6, 1, contrib.sparkline, {
      label,
      tags: true,
      style: {
	fg: 'green'
      }
    });
    si.networkInterfaceDefault(iface => {

      si.networkStats(iface, data => {
	updateNetChart(data, sparkline);
      });
      
      setInterval(() => {
	si.networkStats(iface, data => {
	  updateNetChart(data, sparkline);
	});
      }, 500);
    });
    
    
    sparkline.screen.render();
  };
}

module.exports = {
  drawNetworkScreen: draw
};
