const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();

const sneaks_data = require('./sneaks-data.json');

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/images', express.static(__dirname + '/src/images'));
app.get('/', (req,res) => {
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

let from = 0;
let to = 10;

app.get( '/sneakers', ( req, res ) => {
  const { sneakers } = sneaks_data;
  const { limit } = req.query;
  res.send({ count: sneakers.length, results: sneakers.slice(from, to ) });
  from = to;
  to = to + 10;

  if( to > sneakers.length ) {
    from = 0;
    to = 10;
  }

});

app.listen( PORT, () => console.log(`server listening on port ${PORT}`));