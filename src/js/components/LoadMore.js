import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import fetchData from '../actions';

const LoadMore = ({ step }) => {
  const loadedProducts = useSelector( state => state.sneakers.productslist.length );
  const totalProducts = useSelector( state => state.sneakers.totalProducts );
  const productsQuery = useSelector( state => state.sneakers.productsQuery );
  const dispatch = useDispatch();

  if( !loadedProducts || loadedProducts >= totalProducts ) return null;

  const loadMore = () => {

    const from = +productsQuery.match(/from=[0-9]{1,}/ig)[0].split('=')[1];
    const to = +productsQuery.match(/to=[0-9]{1,}/ig)[0].split('=')[1];

    let url = productsQuery.replace(`from=${from}`, `from=${to}`);
    url = url.replace(`to=${to}`, `to=${to + step}`);

    dispatch({ type: 'SET_PRODUCTS_QUERY', payload: url });
    dispatch( fetchData( url ) );
  };

  return (
    <div className="container-load-more">
      <Button clickHandler={loadMore} className="btn load-more">load more</Button>
    </div>
  )
};

LoadMore.propTypes = {
  step: PropTypes.number.isRequired,
};

export default LoadMore;