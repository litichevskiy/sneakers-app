import React from 'react';
import { useSelector } from 'react-redux';

const QuantitySneakers = () => {
  const quantity = useSelector( state => state.sneakers.totalProducts );
  if( quantity < 1 ) return null;
  return <div className="quantity-sneakers">Found {quantity} pairs</div>
};

export default QuantitySneakers;