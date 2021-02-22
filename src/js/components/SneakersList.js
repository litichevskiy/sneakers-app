import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SneakersItem from './SneakersItem';

const SneakersList = () => {

  const productslist = useSelector( state => state.sneakers.productslist );
  const dispatch = useDispatch();

  const showDetails = useCallback(( id ) => {
    dispatch({
      type: 'SET_SELECTED_PRODUCT',
      payload: id
    });
  },[]);

  if( !productslist.length ) return null;

  return(
    <ul className="sneakers-list">
    {productslist.map( item => {
      return <SneakersItem key={item.sku} data={item} clickHandler={showDetails} />
    })
    }</ul>
  );
};

export default SneakersList;