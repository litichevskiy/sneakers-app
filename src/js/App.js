import React from 'react';

import SneakersForm from './components/SneakersForm';
import Skeleton from '@material-ui/lab/Skeleton';

const Variants = () => {
  return (
    <div>
      <Skeleton variant="rect" width={210} height={118} />
    </div>
  );
}

const App = () => {
  return(
    <div>
      <SneakersForm />
    </div>
  )
};

export default App;