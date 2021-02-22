import React, { Fragment } from 'react';
import SneakersForm from './components/SneakersForm';
import SneakersList from './components/SneakersList';
import SneakersDetails from './components/SneakersDetails';
import LoadMore from './components/LoadMore';
import QuantitySneakers from './components/QuantitySneakers';
import LoaderSneakersList from './components/LoaderSneakersList';
import Alert from './components/Alert';
import { QUANTITY_SNEAKERS } from './constants';

const App = () => {

  return(
    <Fragment>
      <SneakersForm />
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