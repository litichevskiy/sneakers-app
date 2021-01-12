import { combineReducers } from 'redux';

const counter = ( state = {}, { type, payload } ) => {
  switch( type ) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter
});

export default rootReducer;