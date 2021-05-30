class SwipeDetect{
  constructor({ container, touchStart, touchMove, touchEnd }) {
    this.container = container;
    this.touchStart = touchStart;
    this.touchMove = touchMove;
    this.touchEnd = touchEnd;
    this.startX = 0;

    container.addEventListener('touchstart', this._touchStart, { passive: false } );
    container.addEventListener('touchmove', this._touchMove, { passive: true } );
    container.addEventListener('touchend', this._touchEnd, { passive: true } );
  }

  destroy() {
    this.container.removeEventListener('touchstart', this._touchStart );
    this.container.removeEventListener('touchmove', this._touchMove );
    this.container.removeEventListener('touchend', this._touchEnd );
    this.container = this.touchStart = this.touchMove = this.touchEnd = null;
  }

  _touchStart = ( event ) => {
    const { changedTouches, target } = event;

    if( target === this.container ) event.preventDefault();

    this.startX = changedTouches[0].pageX + 0.01;
    this.touchStart();
  }

  _touchMove = ( event ) => {
    const touches = event.changedTouches[0];
    const direction = ( touches.pageX > this.startX ) ? 'right' : 'left';
    const deltaX = touches.pageX - this.startX;

    this.touchMove( deltaX, direction );
  }

  _touchEnd = ({ changedTouches }) => {
    const touches = changedTouches[0];
    const deltaX = touches.pageX - this.startX;
    const direction = ( touches.pageX > this.startX ) ? 'right' : 'left';

    this.touchEnd( deltaX, direction );
  }
};

export default SwipeDetect;