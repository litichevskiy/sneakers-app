const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();


const bodyParser = require('body-parser');
const fs = require('fs');

// const SneaksAPI = require('sneaks-api');
// const sneaks = new SneaksAPI();

app.use(bodyParser.json());




// var ImageKit = require("imagekit");
// var imagekit = new ImageKit({
//   publicKey : "public_ylPWQAxwrXB+ffRJoazUuLblCyo=",
//   privateKey : "private_befK2qC97CZgDoLlS/0vmYXi16M=",
//   urlEndpoint : "https://ik.imagekit.io/gbc7fgci17l/"
// });



const sneaks_data = require('./sneaks-data.json');

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/images', express.static(__dirname + '/src/images'));
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/dist/js/index.html'));
});

const db = require('./db-sneakers-v1.json');


app.post('/add-sneakers', (req, res) => {
  const { body } = req;

  fs.readFile('db-sneakers-v1.json', ( err, data ) => {
    if (err) return res.status(500).send( err );

    const sneakersData = JSON.parse( data );

    sneakersData.sneakers = sneakersData.sneakers.concat( body );

    fs.writeFile('db-sneakers-v1.json', JSON.stringify( sneakersData, null, 2 ),( err ) => {
      if (err) return res.status(500).send( err );
      else res.sendStatus( 200 );
    })
  });
});



app.get( '/brands', ( req, res ) => {
  const { brands } = sneaks_data;
  setHeaders( res );
  res.send({ results: brands });
});

app.get( '/genders', ( req, res ) => {
  const { genders } = sneaks_data;
  setHeaders( res );
  res.send({ results: genders });
});

app.get( '/sneakers/:id', ( req, res ) => {
  const { id } = req.params;
  const { sneakers } = sneaks_data;
  const sneaker = sneakers.filter( item => item.sku === id );
  let status = 200;
  if( !sneaker.length ) status = 404;
  setHeaders( res );
  res.status( status ).send({ results: sneaker })
});

const DEFAULT_QUANTITY = 30;
let from = 0;
let to = DEFAULT_QUANTITY;

app.get( '/sneakers', ( req, res ) => {
  const { sneakers } = sneaks_data;
  const { limit } = req.query;
  setHeaders( res );
  // res.send({ count: sneakers.length, results: sneakers.slice(from, to ) });
  let result = db.sneakers.slice(from, to );


  res.send({ count: db.sneakers.length, results: result });
  from = to;
  to = to + DEFAULT_QUANTITY;

  // if( to > sneakers.length ) {
  //   from = 0;
  //   to = DEFAULT_QUANTITY;
  // }

});


app.use(( req, res ) => {
  res.sendFile(path.join(__dirname+'/pageNotFound.html'));
})

const setHeaders = res => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('contentType', 'application/json')
};

app.listen( PORT, () => console.log(`server listening on port ${PORT}`));