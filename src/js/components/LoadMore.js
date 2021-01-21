import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import fetchData from '../actions';

const LoadMore = ({ currentPage }) => {
  const [page, setPage] = useState( currentPage );
  const loadedProducts = useSelector( state => state.sneakers.productslist.length );
  const totalProducts = useSelector( state => state.sneakers.totalProducts );
  const productsQuery = useSelector( state => state.sneakers.productsQuery );
  const dispatch = useDispatch();

  if( !loadedProducts || loadedProducts === totalProducts ) return null;

  const loadMore = () => {
    setPage( page + 1 );
    const url = productsQuery.replace(/page=[0-9]{1,}/, `page=${page + 1}`);
    dispatch({ type: 'SET_PRODUCTS_QUERY', payload: url });
    dispatch( fetchData( url ) );
  };

  return <Button clickHandler={loadMore}>load more</Button>
};

LoadMore.propTypes = {
  currentPage: PropTypes.number.isRequired,
};

export default LoadMore;