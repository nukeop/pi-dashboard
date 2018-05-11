var _ = require('lodash');
var moment = require('moment');
var blessed = require('blessed'),
    contrib = require('blessed-contrib');
const eth = require('./services/coinbase');

function updateChart(data, chart, text) {
  let prices = data.prices;
  let pricesFloat = _.map(prices, price => parseFloat(price.price));
  let labels = _(prices).map('time').map(date => moment(date).format('DD/MM/YYYY')).value();
  
  let series = {
    title: data.base,
    x: labels,
    y: pricesFloat
  };

  chart.minY = _.min(pricesFloat);
  text.setContent(_.last(pricesFloat) + ' USD');

  chart.setData(series);
  chart.screen.render();
}

function draw(screen) {
  return () => {
    let label = 'Ethereum';
    let grid = new contrib.grid({
      rows: 8,
      cols: 1,
      label,
      screen
    });

    let price = grid.set(0, 0, 2, 1, blessed.box, {
      align: 'center',
      label: 'Current ETH price'
    });


    eth.getEthPrices()
      .then(data => {

	let minY = _(data.data.prices).reverse().map('price').map(parseFloat).value();
	minY = _.min(minY);
	minY -= 0.025* minY;

	let chart = grid.set(2, 0, 6, 1, contrib.line, {
	  style: {
	    line: 'green',
	    text: 'white',
	    baseline: 'blue'	
	  },
	  minY,
	  label: 'ETH price chart'
	});
	
	updateChart(data.data, chart, price);

	setInterval(() => {
	  eth.getEthPrices()
	    .then(data => {
	      updateChart(data.data, chart, price);
	    })
	    .catch(err => {

	    });
	}, 15000);
      });
    
    screen.render();
  };
}

module.exports = {
  drawEthScreen: draw
};
