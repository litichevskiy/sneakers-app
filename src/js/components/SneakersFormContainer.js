import React, { Fragment, useRef, useEffect, useState } from 'react';
import Button from './Button';
import SneakersForm from './SneakersForm';
import SwipeMenu from '../lib/swipe-menu/index';

const SMALL_DEVICE_WIDTH = 1200; // px
const IS_SHOW_FORM = ( ( window.innerWidth || screen.width ) <= SMALL_DEVICE_WIDTH ) ? false : true;

const SneakersFormContainer = ({ clickHandler }) => {

  const formContainerRef = useRef( null );
  const swipeData = useRef({
    visibility: IS_SHOW_FORM,
    swipeMenu: null
  });

  let visibility;
  let swipeMenu;

  useEffect(() => {

    if( formContainerRef.current ) {

      swipeData.current.swipeMenu = new SwipeMenu({
        container: formContainerRef.current,
        touchEnd: touchEnd
      });
    }
    return () => {
      swipeData.current.swipeMenu.destroy();
    }
  },[]);

  const touchEnd = ( position ) => {
    if( position === 'open' ) swipeData.current.visibility = true;
    else swipeData.current.visibility = false;
  }

  const toggleVisibility = () => {
    const { swipeMenu, visibility } = swipeData.current;

    if( visibility ) swipeMenu.close();
    else swipeMenu.open();

    swipeData.current.visibility = !visibility;
  };

  return(
    <Fragment>

      <div className="wrapper-toggle-visibility">
        <Button
          clickHandler={toggleVisibility}
          className="empty-btn  empty-btn__menu toggle-visibility"
          type="button"
          aria-label="toggle visibility form search"/>
      </div>

      <div ref={formContainerRef} id="menu" className="sneakers-form-container">
        <picture className="logo-container">
          <source srcSet="images/logo/logo-small.webp" />
          <source srcSet="images/logo/logo-small.png" />
          <img className="logo" src="images/logo/logo-small.png" alt="logo" />
        </picture>
        <SneakersForm />
      </div>

    </Fragment>
  );
};

export default SneakersFormContainer;