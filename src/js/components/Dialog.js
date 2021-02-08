import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import focusManager from 'focus-manager';

const ESC_CODE = 'Escape';
const ESC_KEY_CODE = 27;

const Dialog = ({ children, closeDialog, selectedItem }) => {

  const refDialog = useRef( null );

  useEffect(() => {
    window.addEventListener('keydown', keyBoardHandler );
    focusManager.capture( refDialog.current );
    return () => {
      focusManager.release( selectedItem );
      window.addEventListener('keydown', keyBoardHandler );
    }
  },[]);

  const keyBoardHandler = ({ code, keyCode }) => {
    if( code === ESC_CODE || keyCode === ESC_KEY_CODE ) closeDialog();
  };

  const clickHandler = ({ target }) => {
    if ( target === refDialog.current ) closeDialog();
  };

  return(
    <div
      ref={refDialog}
      onClick={clickHandler}
      className="dialog"
      role="dialog">
      {children}
    </div>
  );
};

Dialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  selectedItem: PropTypes.instanceOf( Element ).isRequired
};

export default Dialog;