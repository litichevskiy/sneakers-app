import React, { useRef, useEffect, useState, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import fetchData from '../actions';
import serverAPI from '../serverAPI';
import { SNEAKERS_PATH, QUANTITY_SNEAKERS } from '../constants';

const PATH_SEARCH_KEYS = '/search-keys';
const MIN_RELEASE_YEAR = 1984;
const MAX_RELEASE_YEAR = (new Date).getFullYear();
const REG_EX_FULL_YEAR = /^[0-9]{4}$/;
const WRONG_YEAR_FORMAT = `"YYYY" between ${MIN_RELEASE_YEAR} and ${MAX_RELEASE_YEAR}`;
const EMPTY_FORM = 'Select at least one value';
const TOO_SHORT_NAME = 'Minimum 3 symbols';

const initialState = {
  brands: [],
  genders: [],
  colors: [],
};

const reducer = ( state, { type, payload } ) => {
  switch( type ) {
    case 'set_search_keys':
      return { ...state, ...payload };
    default:
      return state;
  }
}

const SneakersForm = () => {

  const formRef = useRef( null );
  const [isEmpty, setEmpty] = useState( false );
  const [errorYear, setErrorYear] = useState( false );
  const [errorName, setErrorName] = useState( false );
  const [lastQuery, setLastQuery] = useState('');
  const [state, setState] = useReducer( reducer, initialState );
  const dispatch = useDispatch();

  useEffect(() => {
    function fetchSearchKeys () {

      serverAPI.fetch( PATH_SEARCH_KEYS )
      .then(({ brands, genders, colors }) => {
        setState({ type: 'set_search_keys', payload: { brands, genders, colors } });
      })
      .catch( error => {
        dispatch({ type: 'SNEAKERS_REQUEST_FAIL', payload: error.message });
      });
    }

    fetchSearchKeys();

  }, []);

  const validateReleaseYear = ({ target: { value } }) => {

    if( !value.length ) return setErrorYear( false );

    const year = parseInt( Number(value), 10 );

    if( year >= MIN_RELEASE_YEAR && year <= MAX_RELEASE_YEAR ) setErrorYear( false );
    else setErrorYear( true );
  }

  const validateName = ({ target: { value } }) => {
    value = value.trim();

    if( !value.length ) return setErrorName( false );

    if( value.length < 3 ) setErrorName( true );
    else setErrorName( false );
  }

  const submitHandler = ( event ) => {
    event.preventDefault();

    if( errorYear || errorName ) return;

    const query = Array.from(formRef.current.elements).reduce(( combine, { name, value } ) => {
      return ( value.trim() ) ? combine += `${name}=${value}&` : combine;
    }, '');

    if( !query ) return setEmpty( true );
    if( isEmpty ) setEmpty( false );
    if( lastQuery === query ) return;

    setLastQuery( query );

    const url = `${SNEAKERS_PATH}?${query}from=0&to=${QUANTITY_SNEAKERS}`;

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

  const{ brands, genders, colors } = state;

  return (
    <form ref={formRef} className="sneakers-form">

      <div
        className={ !brands.length ?
          "form-item-container select-wrapper disabled" :
          "form-item-container select-wrapper" }
          data-role="brand">
        <select
          disabled={ !brands.length ? true : false }
          name="brand"
          className="select"
          aria-label="sneaker brand">
          <option label="brand"></option>
          {getListOptions( brands )}
        </select>

      </div>

      <div
        className={ !genders.length ?
          "form-item-container select-wrapper disabled" :
          "form-item-container select-wrapper" }
          data-role="gender">
        <select
          disabled={ !genders.length ? true : false }
          name="gender"
          className="select"
          aria-label="genders">
          <option label="gender"></option>
          {getListOptions( genders )}
        </select>
      </div>

      <div className="form-item-container" data-role="sheaker-name">
        <input
          onChange={validateName}
          className={errorName ? "input input--invalid" : "input"}
          type="text"
          name="name"
          placeholder="Sneaker Name"
          autoComplete="off"
          aria-label="sneaker name"/>
          {errorName && errorMessage( TOO_SHORT_NAME )}
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

      <div
        className={ !colors.length ?
          "form-item-container select-wrapper disabled" :
          "form-item-container select-wrapper" }
        data-role="color">
        <select
          disabled={ !colors.length ? true : false }
          name="colorway"
          className="select"
          aria-label="sneaker colors">
          <option label="color"></option>
          {getListOptions( colors )}
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
  );
};

const getListOptions = ( list ) => {
  return list.map(value => <option key={value} value={value}>{value}</option> )
};

const errorMessage = ( message ) =>
  <span className="error-massage">{message}</span>;

export default SneakersForm;