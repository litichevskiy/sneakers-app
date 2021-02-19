import React from 'react';
import { useSelector } from 'react-redux';

const QUERY_PARAMS = {
  brand: 'brand',
  gender: 'gender',
  name: 'gender',
  releaseYear: 'Release Year',
  sku: 'Stock Keeping Unit',
  colorway: 'color'
};

const QuantitySneakers = () => {
  const quantity = useSelector( state => state.sneakers.totalProducts );
  const productsQuery = useSelector( state => state.sneakers.productsQuery );

  if( quantity === null ) return null;

  if( quantity < 1 ) {

    const listParams = productsQuery
    .split('?')[1]
    .split('&')
    .reduce(( acc, queryParam ) => {
      const [key, value] = queryParam.split('=');
      const param = QUERY_PARAMS[key];
      if( param ) acc.push([ param, value ]);
      return acc;
    },[]);

    return <div className="quantity-sneakers container">{getMessage( listParams )}</div>
  }

  return <div className="quantity-sneakers">Found {quantity} pairs</div>
};

const getMessage = ( list ) => {
  return(
    <div className="message">
      <h2 className="header">We could not find anything for</h2>
      {list.map(([ key, value ]) => {
        return(
          <div key={key} className="message-row">
            <span className="title">{key}</span>
            <span className="content">{value}</span>
          </div>
        )
      })}
      <div className="footer">Please try a different search</div>
    </div>
  )
};

export default QuantitySneakers;