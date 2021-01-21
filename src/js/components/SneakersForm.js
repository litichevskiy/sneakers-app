import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import fetchData from '../actions';
import {
  SNEAKERS_API,
  BRANDS_PATH,
  GENDERS_PATH,
  SNEAKERS_COLORS,
  SNEAKERS_PATH,
  QUANTITY_SNEAKERS

} from '../constants';

const SneakersForm = () => {
  const formRef = useRef( null );
  const [brands, setBrands] = useState([]);
  const [genders, setGenders] = useState([]);
  const [isEmpty, setEmpty] = useState(false);
  const [lastQuery, setLastQuery] = useState('');
  const dispatch = useDispatch();
  // const productsQuery = useSelector( state => state.sneakers.productsQuery );

  useEffect(() => {
    async function fetchData () {
      const brandsResponse = await fetch( `${SNEAKERS_API}${BRANDS_PATH}` );
      const gendersResponse = await fetch( `${SNEAKERS_API}${GENDERS_PATH}` );
      const brands = await brandsResponse.json();
      const genders = await gendersResponse.json();

      setBrands( brands.results );
      setGenders( genders.results );
    }

    fetchData();

  }, []);

  const submitHandler = ( event ) => {
    event.preventDefault();

    let query = [...formRef.current.elements].reduce(( combine, { name, value } ) => {
      return ( value.trim() ) ? combine += `${name}=${value}&` : combine;
    }, '');

    if( !query ) return setEmpty( true );
    if( isEmpty ) setEmpty( false );
    if( lastQuery === query ) return;

    setLastQuery( query );

    const url = `${SNEAKERS_API}${SNEAKERS_PATH}?${query}limit=${QUANTITY_SNEAKERS}&page=0`;

    // if( productsQuery === url ) return;

    dispatch({ type: 'SET_PRODUCTS_QUERY', payload: url });
    dispatch( fetchData( url ) );
    dispatch({ type: 'DELETE_PRODUCTS' });
  };

  const clearForm = ( event ) => {
    event.preventDefault();

    [...formRef.current.elements].forEach( item => item.value = '' );
    setLastQuery('');
  }

  return (
    <div>
      <form ref={formRef} >

        <select name="brand">
          <option label="brand"></option>
          {getListOptions( brands )}
        </select>

        <select name="gender">
          <option label="gender"></option>
          {getListOptions( genders )}
        </select>

        <select name="colorway">
          <option label="color"></option>
          {getListOptions( SNEAKERS_COLORS )}
        </select>

        <input type="text" name="sku" placeholder="SKU" />
        <input type="text" name="name" placeholder="Sneaker Name" />
        <input type="text" name="releaseYear" placeholder="Release Year" />
        <hr />
        { isEmpty && <div style={{color: 'tomato'}}>You must select at least one value</div> }
        <Button clickHandler={submitHandler} type="button">send</Button>
        <Button clickHandler={clearForm} type="button">clear</Button>
      </form>
    </div>
  )
};

const getListOptions = ( list ) => {
  return list.map(value => <option key={value} value={value}>{value}</option> )
};

export default SneakersForm;