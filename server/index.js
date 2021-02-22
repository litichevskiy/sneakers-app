const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const sslRedirect = require('heroku-ssl-redirect').default;

const shouldCompress = require('./shouldCompress');
const getSneakersBySKU = require('./getSneakersBySKU');
const getSneakersByFilters = require('./getSneakersByFilters');
const db = require('../db-sneakers-v1.json');

app.use(sslRedirect(['other','development','production']));
app.use(compression({filter: shouldCompress}));

app.use('/dist', express.static(__dirname + './../dist'));
app.use('/images', express.static(__dirname + './../src/images'));
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'./../dist/js/index.html'));
});

app.get( '/search-keys', ( req, res ) => {
  const { brands, genders, colors } = db;
  res.send({ brands, genders, colors });
});

app.get( '/sneakers', ( req, res ) => {

  const { query } = req;
  const { sneakers } = db;
  let { sku, from, to } = query;

  if( sku ) {

    const result = getSneakersBySKU( sneakers, sku );
    if( !result ) res.send({ count: 0, results: [] });
    else res.send({ count: 1, results: [result] });

  } else{

    from = parseInt( from, 10 );
    to = parseInt( to, 10 );

    if( !(from  >= 0) || !( to >= 0 ) ) {
      res.status( 400 ).send({ message: 'Parameter "from" and "to" must be positiive numbers.' });

    } else{

      const results = getSneakersByFilters( sneakers, query );
      if( results.error ) res.status( 400 ).send({ message: results.message })
      else res.send({ count: results.length, results: results.slice( from, to ) });
    }
  }
});

app.use(( req, res ) => {
  res.sendFile(path.join(__dirname+'./../view/pageNotFound.html'));
});

app.listen( PORT, () => console.log(`server listening on port ${PORT}`));