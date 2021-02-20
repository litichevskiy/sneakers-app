const compression = require('compression');

const shouldCompress = ( req, res ) => {
  if (req.headers['x-no-compression']) return false;
  else return compression.filter( req, res );
};

module.exports = shouldCompress;