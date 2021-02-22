const fetchData = ( url ) => {
  return ( dispatch, getState ) => {

    dispatch({ type:'LOADING_SNEAKERS', payload: true });

    fetch( url )
    .then( response => {
      return response.json();
    })
    .then( response => {
      const { results, count } = response;

      dispatch({ type:'LOADING_SNEAKERS', payload: false });
      dispatch({ type:'ADD_PRODUCTS', payload: results });
      dispatch({ type: 'SET_TOTAL_PRODUCTS', payload: count });
    })
    .catch( error => {

    })

  }
}

export default fetchData;