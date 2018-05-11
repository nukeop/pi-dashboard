let coinbaseUrl = 'https://www.coinbase.com/api/v2/prices/ETH-USD/historic?period=week';

function getEthPrices() {
  return fetch(coinbaseUrl)
    .then(results => results.json());
}

module.exports = {
  getEthPrices
};
