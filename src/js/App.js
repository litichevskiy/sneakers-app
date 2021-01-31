import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SneakersForm from './components/SneakersForm';
import SneakersList from './components/SneakersList';
import SneakersDetails from './components/SneakersDetails';
import LoadMore from './components/LoadMore';
import { SNEAKERS_PAGE_NUMBER } from './constants';

// import Skeleton from '@material-ui/lab/Skeleton';

const Variants = () => {
  return (
    <div>
      <Skeleton variant="rect" width={210} height={118} />
    </div>
  );
}

const TotalResults = () => {
  const quantity = useSelector( state => state.sneakers.totalProducts );
  return <div> found {quantity} pairs</div>
};

const App = () => {

  return(
    <Fragment>
      <SneakersForm />
      {/*<TotalResults />*/}
      {/*<LoadMore currentPage={SNEAKERS_PAGE_NUMBER} />*/}
      {/*<SneakersList />*/}
      <SneakersDetails />
    </Fragment>
  )
};

export default App;