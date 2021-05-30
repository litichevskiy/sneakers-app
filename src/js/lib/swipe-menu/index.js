import easingAnimation from './easingAnimation.js';
import SwipeDetect from './SwipeDetect.js'

const TOUCH_OFFSET = 20; // touch offset by quantity percent

class Swipe{
  constructor({ container, touchEnd }) {
    this.container = container;
    this.width = container.clientWidth;
    this.touchEnd = touchEnd;
    this.isOpen = false;
    this.offsetPoints = [];

    this.swipeDetect = new SwipeDetect({
      container: container,
      touchStart: this._touchStart,
      touchMove: this._touchMove,
      touchEnd: this._touchEnd
    });
  }

  destroy() {
    this.container.removeEventListener('touchstart', this._touchStart );
    this.container.removeEventListener('touchmove', this._touchMove );
    this.container.removeEventListener('touchend', this._touchEnd );
    this.container = this.swipeDetect = null;
  }

  close () {
    if( !this.isOpen ) return;

    this.offsetPoints = easingAnimation( 0, -this.width, true );
    this.container.style.willChange = 'transform';
    this._transformForm();
  }

  open () {
    if( this.isOpen ) return;

    this.offsetPoints = easingAnimation( -this.width, this.width, true );
    this.container.style.willChange = 'transform';
    this._transformForm();
  }

  _touchStart = () => {
    this.container.style.willChange = 'transform';
  }

  _touchMove = ( deltaX, direction ) => {

    if( !this._isMove( direction ) ) return;

    if( deltaX > this.width ) deltaX = this.width;
    else if( deltaX < -this.width ) deltaX = -this.width;

    if( deltaX < 0 ) this.offsetPoints.push( deltaX );
    else this.offsetPoints.push( -this.width + deltaX );

    this._transformForm();
  }

  _touchEnd = ( deltaX, direction ) => {

    if( !this._isMove( direction ) ) return;

    if( deltaX > this.width ) deltaX = this.width;
    else if( deltaX < -this.width ) deltaX = -this.width;

    const offsetX = ( deltaX < 0 ) ? -deltaX : deltaX;
    const offset = getSwipePercent( this.width, offsetX );

    let points;

    if( direction === 'left' ) {

      if( offset > TOUCH_OFFSET ) {
         points = easingAnimation( deltaX, ( this.width - offsetX ), false );
      }
      else points = easingAnimation( deltaX, -( offsetX ), false );


    } else {

      if( offset < TOUCH_OFFSET ) {
         points = easingAnimation( -( this.width - deltaX ),  deltaX, false );
      }
      else points = easingAnimation( -( this.width - deltaX ), ( this.width - deltaX ), true );
    }

    this.offsetPoints = this.offsetPoints.concat( points );

    this._transformForm();

    if( this.touchEnd ) {
      const position = ( points[points.length -1 ] === 0 ) ? 'open' : 'close';
      this.touchEnd( position );
    }
  }

  _transformForm = () => {

    if( this.offsetPoints.length ) {

      const point = this.offsetPoints.shift();
      this.container.style.transform = `translateZ(0) translateX(${point}px)`;

      if( this.offsetPoints.length ) requestAnimationFrame( this._transformForm );

      else{

        if( point === 0 ) this.isOpen = true;
        else if ( point === -this.width ) this.isOpen = false;
      }
    }

    else this.container.style.willChange = 'auto';
  }

  _isMove( direction ) {
    if( this.isOpen && direction === 'right' ) return false;
    if( !this.isOpen && direction === 'left' ) return false;

    return true;
  }
};

const getSwipePercent = ( a, b ) => 100 / ( a / b );

export default Swipe;