const fetchData = ( url ) => {
  return ( dispatch, getState ) => {

    fetch( url )
    .then( response => {
      return response.json();
    })
    .then( response => {
      const { results, count } = response;
      dispatch({ type:'ADD_PRODUCTS', payload: results });
      dispatch({ type: 'SET_TOTAL_PRODUCTS', payload: count });
    })
    .catch( error => {

    })

  }
}

export default fetchData;