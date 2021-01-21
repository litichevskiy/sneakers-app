import { combineReducers } from 'redux';

const sneakers = ( state = {}, { type, payload } ) => {
  switch( type ) {
    case 'IS_LOADING':
      return { ...state, isLoading: payload };
    case 'SET_ERROR':
      return { ...state, error: payload };
    case 'SET_PRODUCTS_QUERY':
      return { ...state, productsQuery: payload };
    case 'ADD_PRODUCTS':
      return { ...state, productslist: [...state.productslist, ...payload ] };
    case 'DELETE_PRODUCTS':
      return { ...state, productslist: [] };
    case'SET_TOTAL_PRODUCTS':
      return { ...state, totalProducts: payload };
    case'SET_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProduct: state.productslist.filter( item => item.sku === payload )[0] };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  sneakers,
});

export default rootReducer;