import React, { useRef, useEffect, useState } from 'react';

import { SNEAKERS_API, GET_BRANDS, GET_GENDERS, SNEAKERS_COLORS } from '../constants';

const SneakersForm = () => {
  const formRef = useRef( null );
  const [brands, setBrands] = useState([]);
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    async function fetchData () {
      const brandsResponse = await fetch( `${SNEAKERS_API}${GET_BRANDS}` );
      const gendersResponse = await fetch( `${SNEAKERS_API}${GET_GENDERS}` );
      const brands = await brandsResponse.json();
      const genders = await gendersResponse.json();

      setBrands( brands.results );
      setGenders( genders.results );
    }

    fetchData()

  }, []);

  const submit = ( event ) => {
    event.preventDefault();

    let query = [...formRef.current.elements].reduce(( combine, { name, value } ) => {
      return ( value.trim() ) ? combine += `${name}=${value}&` : combine;
    }, '?')

    query = query.slice( 0, -1 );
    console.log( query );
  };

  console.log('render form');

  return (
    <div>
      <form ref={formRef} onSubmit={submit}>

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
        <button type="submit">send</button>
      </form>
    </div>
  )
};

const getListOptions = ( list ) => {
  return list.map(value => <option key={value} value={value}>{value}</option> )
};

export default SneakersForm;