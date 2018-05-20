var _ = require('lodash');
var moment = require('moment');
var blessed = require('blessed'),
    contrib = require('blessed-contrib');
const eth = require('./services/coinbase');
const view = require('./view');


class EthereumView extends view.View {
  constructor(screen) {
    super(screen);
    this.label = 'Ethereum';
  }

  create() {
    this.grid = new contrib.grid({
      rows: 8,
      cols: 1,
      label: this.label,
      screen: this.screen
    });

    this.price = this.grid.set(0, 0, 2, 1, blessed.box, {
      align: 'center',
      label: 'Current ETH price'
    });

    eth.getEthPrices()
      .then(data => {
	let minY = _(data.data.prices).reverse().map('price').map(parseFloat).value();
	minY = _.min(minY);
	minY -= 0.025* minY;
	
	this. chart = this.grid.set(2, 0, 6, 1, contrib.line, {
	  style: {
	    line: 'green',
	    text: 'white',
	    baseline: 'blue'	
	  },
	  minY,
	  label: 'ETH price chart'
	});

	let prices = data.data.prices;
	let pricesFloat = _.map(prices, price => parseFloat(price.price));
	let labels = _(prices).map('time').map(date => moment(date).format('DD/MM/YYYY')).value();
	
	let series = {
	  title: data.base,
	  x: labels,
	  y: pricesFloat
	};

	this.chart.minY = _.min(pricesFloat);
	this.price.setContent(_.last(pricesFloat) + ' USD');

	this.chart.setData(series);
	this.screen.render();
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

module.exports = EthereumView;
