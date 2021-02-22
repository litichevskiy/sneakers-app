import React from 'react';
import { useSelector } from 'react-redux';
import Skeleton from './Skeleton';
import { QUANTITY_SNEAKERS } from '../constants';

const LoaderSneakersList = () => {
  const isLoading = useSelector( state => state.sneakers.isLoading );

  if( !isLoading ) return null;

  const skeletons = new Array( QUANTITY_SNEAKERS ).fill();

  return(
    <ul className="sneakers-list sneakers-list--skeleton">
      {skeletons.map(( item, index ) => <SneakersItemSkeleton key={index} /> )}
    </ul>
  );
};

const SneakersItemSkeleton = () => {
  return (
    <li className="sneakers-item-skeleton">
      <Skeleton variant="text" style={{ height: '32px' }} />
      <Skeleton variant="text" style={{ height: '23px', width: '45%' }} />
      <Skeleton variant="rect" style={{height: '270px', margin: '1rem auto'}} />
      <Skeleton variant="text" style={{height: '23px', width: '35%'}} />
    </li>
  );
};

export default LoaderSneakersList;