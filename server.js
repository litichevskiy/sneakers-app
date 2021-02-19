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



// const sneaks_data = require('./sneaks-data.json');

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
  const { brands } = db;
  setHeaders( res );
  res.send({ results: brands });
});

app.get( '/genders', ( req, res ) => {
  const { genders } = db;
  setHeaders( res );
  res.send({ results: genders });
});

app.get( '/sneakers/:id', ( req, res ) => {
  const { id } = req.params;
  const { sneakers } = db;
  const sneaker = sneakers.filter( item => item.sku === id );
  let status = 200;
  if( !sneaker.length ) status = 404;
  setHeaders( res );
  res.status( status ).send({ results: sneaker })
});

app.get( '/sneakers', ( req, res ) => {

  console.log( req.query )
  const { query } = req;
  const { sneakers } = db;
  let { sku, from, to } = query;
  // const { brand, gender, name, releaseYear, sku, colorway, limit, page } = req.query;


  if( sku ) {
    const result = getSneakersBySKU( sneakers, sku );
    if( !result ) res.status( 404 ).send({ message: `sneakers with sku ${sku} not found`});
    else res.send({ count: 1, results: [result] });

  } else{

    from = parseInt( from, 10 );
    to = parseInt( to, 10 );

    if( !(from  >= 0) || !( to >= 0 ) ) {
      res.status( 400 ).send({ message: '"from" and "to" must be positiive numbers' });

    } else{

      const results = getSneakersByFilters( sneakers, query );
      if( results.error ) res.status( 400 ).send({ message: results.message })
      else res.send({ count: results.length, results: results.slice( from, to ) });
    }
  }

});




app.use(( req, res ) => {
  res.sendFile(path.join(__dirname+'/pageNotFound.html'));
})

const setHeaders = res => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('contentType', 'application/json')
};

app.listen( PORT, () => console.log(`server listening on port ${PORT}`));


// puma 2000

const getSneakersBySKU = ( list, sku ) => {
  let result = false;
  sku = sku.toLowerCase();
  list.some(( item, index ) => {
    if( item.sku.toLowerCase() === sku ) return result = item;
  });
  return result;
};

const getSneakersByFilters = (() => {

  const filters = {
    brand: ( list, value ) => value ? filter( list, 'brand', value ) : list,
    gender: ( list, value ) => value ? filter( list, 'gender', value ) : list,
    name: ( list, value ) => value ? filter( list, 'name', value ) : list,
    releaseYear: ( list, value ) => value ? filter( list, 'releaseYear', value ) : list,
    colorway: ( list, value ) => value ? filter( list, 'colorway', value ) : list,
  };

  const FILTER_NAMES = Object.keys( filters );

  const filter = ( list, key, value ) => {

    switch( key ) {
      case'releaseYear':
        value = parseInt( value, 10 );
        return list.filter( item => item[key] === value );
      case'name':
        value = value.toLowerCase();
        return list.filter( item => item[key].toLowerCase().includes( value ) );
      case'colorway':
        return list.filter( item => item[key].toLowerCase().includes( value ) );
      default:
        value = value.toLowerCase();
        return list.filter( item => item[key].toLowerCase() === value );
    }
  };

  return ( list, query ) => {
    console.log( query )

    const params = FILTER_NAMES.filter(( key ) => query[key] );

    if( !params.length ) return {error: true, message: `must be selected one of "${FILTER_NAMES.join(', ')}"`};

    return FILTER_NAMES.reduce(( accumulator, key ) => {
      accumulator = filters[key]( accumulator, query[key] );
      return accumulator;
    }, list );
  };

})();