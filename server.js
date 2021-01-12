/*
  sku - Stock Keeping Unit
  Sneaks-API
  ////////////////////////////////////////////////////////////////
  local very slow
  https://github.com/druv5319/Sneaks-API
  https://sneaks-app.com/#/search/china
  //////////////////////////////////////////////////////////////////////
  fast is free?
  https://api.thesneakerdatabase.dev/v2
  https://app.swaggerhub.com/apis-docs/tg4solutions/dev-v_2_sneaker_database/1.0.0
  https://tg4.solutions/the-sneaker-database-test-endpoints-available/
  https://thesneakerdatabase.com/

  apps
  goat : https://goat.com/sneakers/wmns-dunk-low-black-white-dd1503-101
  stockx : https://stockx.com/nike-dunk-low-white-black-2021-w
  flightclub : https://flightclub.com/wmns-dunk-low-black-white-dd1503-101
*/



const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();

const sneaks_data = require('./sneaks-data.json');

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/images', express.static(__dirname + '/src/images'));
app.get('/', (req,res) => {
  // res.sendFile(path.join(__dirname+'/index.html'));
  res.sendFile(path.join(__dirname+'/dist/js/index.html'));
});

app.get( '/brands', ( req, res ) => {
  const { brands } = sneaks_data;
  res.send({ results: brands })
});

app.get( '/genders', ( req, res ) => {
  const { genders } = sneaks_data;
  res.send({ results: genders })
});

app.get( '/sneakers/:id', ( req, res ) => {
  const { id } = req.params;
  const { sneakers } = sneaks_data;
  const sneaker = sneakers.filter( item => item.sku === id );
  let status = 200;
  if( !sneaker.length ) status = 404;
  res.status( status ).send({ results: sneaker })
});

app.get( '/sneakers', ( req, res ) => {
  const { sneakers } = sneaks_data;
  res.send({ count: sneakers.length, results: sneakers })
});

app.listen( PORT, () => console.log(`server listening on port ${PORT}`));