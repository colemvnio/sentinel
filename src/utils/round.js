const Decimal = require('decimal.js');

// eslint-disable-next-line no-extend-native
Number.prototype.sRound = (precision = 2) => new Decimal(this).toDP(precision, Decimal.ROUND_HALF_EVEN).toNumber();
