import serverAPI from '../serverAPI';

const fetchData = ( url ) => {
  return ( dispatch ) => {

    dispatch({ type:'LOADING_SNEAKERS', payload: true });

    serverAPI.fetch( url )
    .then(({ results, count }) => {
      dispatch({ type:'LOADING_SNEAKERS', payload: false });
      dispatch({ type:'ADD_PRODUCTS', payload: results });
      dispatch({ type: 'SET_TOTAL_PRODUCTS', payload: count });
    })
    .catch( error => {
      dispatch({ type: 'SNEAKERS_REQUEST_FAIL', payload: error.message });
    });
  }
}

export default fetchData;