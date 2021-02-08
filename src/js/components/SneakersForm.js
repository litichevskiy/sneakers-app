import React, { useRef, useEffect, useState, Fragment } from 'react';
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

const MIN_RELEASE_YEAR = 1984;
const MAX_RELEASE_YEAR = (new Date).getFullYear();
const REG_EX_FULL_YEAR = /^[0-9]{4}$/;
const WRONG_YEAR_FORMAT = `"YYYY" between ${MIN_RELEASE_YEAR} and ${MAX_RELEASE_YEAR}`;
const EMPTY_FORM = 'Select at least one value';
const SMALL_DEVICE_WIDTH = 1200; // px
const isShowForm = ( ( screen.width || window.innerWidth ) <= SMALL_DEVICE_WIDTH ) ? false : true;

const SneakersForm = () => {

  const formRef = useRef( null );
  const [brands, setBrands] = useState([]);
  const [genders, setGenders] = useState([]);
  const [isEmpty, setEmpty] = useState( false );
  const [errorYear, setErrorYear] = useState( false );
  const [lastQuery, setLastQuery] = useState('');
  const [isActiveForm, setActiveForm] = useState( isShowForm );
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData () {
      const brandsResponse = await fetch( `${SNEAKERS_API}${BRANDS_PATH}` );
      const gendersResponse = await fetch( `${SNEAKERS_API}${GENDERS_PATH}` );

      const brands = await brandsResponse.json();
      const genders = await gendersResponse.json();

      setBrands( brands.results );
      setGenders( genders.results );
    }

    fetchData()

  }, []);

  const validateReleaseYear = ({ target: { value } }) => {

    if( !value.length ) return setErrorYear( false );

    const year = parseInt( Number(value), 10 );

    if( year >= MIN_RELEASE_YEAR && year <= MAX_RELEASE_YEAR ) setErrorYear( false );
    else setErrorYear( true );
  }

  const submitHandler = ( event ) => {
    event.preventDefault();

    if( errorYear ) return;

    const query = Array.from(formRef.current.elements).reduce(( combine, { name, value } ) => {
      return ( value.trim() ) ? combine += `${name}=${value}&` : combine;
    }, '');

    if( !query ) return setEmpty( true );
    if( isEmpty ) setEmpty( false );
    if( lastQuery === query ) return;

    console.log( query )

    setLastQuery( query );

    const url = `${SNEAKERS_API}${SNEAKERS_PATH}?${query}limit=${QUANTITY_SNEAKERS}&page=0`;

    dispatch({ type: 'SET_PRODUCTS_QUERY', payload: url });
    dispatch( fetchData( url ) );
    dispatch({ type: 'DELETE_PRODUCTS' });
  };

  const clearForm = ( event ) => {
    event.preventDefault();

    [...formRef.current.elements].forEach( item => item.value = '' );
    setLastQuery('');
    setErrorYear( false );
    setEmpty( false );
  };

  const toggleVisibility = ({ currentTarget }) => {
    currentTarget.classList.toggle('is-active');
    setActiveForm( !isActiveForm );
  }

  return (
    <Fragment>

      <div className="wrapper-toggle-visibility">
        <Button
          clickHandler={toggleVisibility}
          className="empty-btn  empty-btn__menu toggle-visibility"
          type="button"
          aria-label="toggle visibility form search"/>
      </div>

      <div className={isActiveForm ? 'sneakers-form-container sneakers-form-container--active' : 'sneakers-form-container'}>

        <picture className="logo-container">
          <source srcSet="images/logo/logo-small.png" />
          <img className="logo" src="images/logo/logo-small.webp" alt="logo" />
        </picture>

        <form ref={formRef} className="sneakers-form">

          <div className="form-item-container select-wrapper" data-role="brand">
            <select name="brand" className="select" aria-label="sneaker brand">
              <option label="brand"></option>
              {getListOptions( brands )}
            </select>
          </div>

          <div className="form-item-container select-wrapper" data-role="gender">
            <select name="gender" className="select" aria-label="genders">
              <option label="gender"></option>
              {getListOptions( genders )}
            </select>
          </div>

          <div className="form-item-container" data-role="sheaker-name">
            <input
              type="text"
              name="name"
              placeholder="Sneaker Name"
              className="input"
              autoComplete="off"
              aria-label="sneaker name"/>
          </div>

          <div className="form-item-container" data-role="release-year">
            <input
              onChange={validateReleaseYear}
              className={errorYear ? "input input--invalid" : "input"}
              type="text"
              name="releaseYear"
              placeholder="Release Year"
              autoComplete="off"
              aria-label="release rear"/>
            {errorYear && errorMessage( WRONG_YEAR_FORMAT ) }
          </div>

          <div className="form-item-container" data-role="sku">
            <input
              type="text"
              name="sku"
              placeholder="Stock Keeping Unit"
              className="input"
              autoComplete="off"
              aria-label="stock keeping unit" />
          </div>

          <div className="form-item-container select-wrapper" data-role="color">
            <select name="colorway" className="select" aria-label="sneaker colors">
              <option label="color"></option>
              {getListOptions( SNEAKERS_COLORS )}
            </select>
          </div>

          <div className="form-item-container container-buttons" data-role="buttons">
            <Button
              clickHandler={clearForm}
              type="button"
              className="empty-btn empty-btn__clear clear"
              title="clear form" />
            <Button
              clickHandler={submitHandler}
              type="button"
              className="empty-btn empty-btn__search search"
              title="search"/>
          { isEmpty && errorMessage( EMPTY_FORM ) }
          </div>

        </form>

      </div>

    </Fragment>
  );
};

const getListOptions = ( list ) => {
  return list.map(value => <option key={value} value={value}>{value}</option> )
};

const errorMessage = ( message ) =>
  <span className="error-massage">{message}</span>;

export default SneakersForm;