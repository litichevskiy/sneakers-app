import React, { Fragment } from 'react';
import SneakersList from './components/SneakersList';
import SneakersDetails from './components/SneakersDetails';
import LoadMore from './components/LoadMore';
import QuantitySneakers from './components/QuantitySneakers';
import LoaderSneakersList from './components/LoaderSneakersList';
import Alert from './components/Alert';
import { QUANTITY_SNEAKERS } from './constants';
import SneakersFormContainer from './components/SneakersFormContainer';


const App = () => {

  return(
    <Fragment>
      <SneakersFormContainer />
      <QuantitySneakers />
      <SneakersList />
      <LoaderSneakersList />
      <LoadMore step={QUANTITY_SNEAKERS} />
      <SneakersDetails />
      <Alert />
    </Fragment>
  )
};

export default App;