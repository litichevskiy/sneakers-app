const getSneakersByFilters = (() => {

  const filters = {
    brand: ( list, value ) => value ? filter( list, 'brand', value ) : list,
    gender: ( list, value ) => value ? filter( list, 'gender', value ) : list,
    name: ( list, value ) => value ? filter( list, 'name', value ) : list,
    releaseYear: ( list, value ) => value ? filter( list, 'releaseYear', value ) : list,
    colorway: ( list, value ) => value ? filter( list, 'colorway', value ) : list,
  };

  const FILTER_NAMES = Object.keys( filters );

  const filter = ( list, key, value ) => {

    switch( key ) {
      case'releaseYear':
        value = parseInt( value, 10 );
        return list.filter( item => item[key] === value );
      case'name':
        value = value.toLowerCase();
        return list.filter( item => item[key].toLowerCase().includes( value ) );
      case'colorway':
        return list.filter( item => item[key].toLowerCase().includes( value ) );
      default:
        value = value.toLowerCase();
        return list.filter( item => item[key].toLowerCase() === value );
    }
  };

  return ( list, query ) => {

    const params = FILTER_NAMES.filter(( key ) => query[key] );

    if( !params.length ) return {
      error: true,
      message: `Must be selected one of: "${FILTER_NAMES.join('", "')}".`
    };

    return FILTER_NAMES.reduce(( accumulator, key ) => {
      accumulator = filters[key]( accumulator, query[key] );
      return accumulator;
    }, list );
  };

})();

module.exports = getSneakersByFilters;