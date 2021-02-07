import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SneakersForm from './components/SneakersForm';
import SneakersList from './components/SneakersList';
import SneakersDetails from './components/SneakersDetails';
import LoadMore from './components/LoadMore';
import QuantitySneakers from './components/QuantitySneakers';
import { SNEAKERS_PAGE_NUMBER } from './constants';

// import Skeleton from '@material-ui/lab/Skeleton';

const Variants = () => {
  return (
    <div>
      <Skeleton variant="rect" width={210} height={118} />
    </div>
  );
}


const App = () => {

  return(
    <Fragment>
      <SneakersForm />
      <QuantitySneakers />
      <SneakersList />
      <LoadMore currentPage={SNEAKERS_PAGE_NUMBER} />
      <SneakersDetails />
    </Fragment>
  )
};

export default App;