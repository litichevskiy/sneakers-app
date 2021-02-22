import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';

const ESC_CODE = 'Escape';
const ESC_KEY_CODE = 27;

const Alert = ({}) => {

  const errorMessage = useSelector( state => state.sneakers.errorMessage );
  const dispatch = useDispatch();

  useEffect(() => {
    if( errorMessage ) {
      window.addEventListener('keydown', keyBoardHandler );
    }
    return () => {
      window.removeEventListener('keydown', keyBoardHandler );
    }
  },[errorMessage]);

  const closeAlert = () =>
    dispatch({ type: 'SNEAKERS_REQUEST_FAIL', payload: null });

  const keyBoardHandler = ({ code, keyCode }) => {
    if( code === ESC_CODE || keyCode === ESC_KEY_CODE ) closeAlert();
  };

  return(
    <div className={ ( errorMessage !== null ) ? "alert alert--active" : "alert" }>
      <Button
        clickHandler={closeAlert}
        className="empty-btn empty-btn__close close"
        aria-label="close" />
      <div className="">{errorMessage}</div>
    </div>
  )
};

export default Alert;