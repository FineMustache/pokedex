
var gamma = require('gamma');

var elem = document.getElementById('result');
elem.textContent = gamma(100);

module.exports = function (n) { return n * 111 }