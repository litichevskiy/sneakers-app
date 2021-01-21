class Ripple {
  constructor( container ) {
    this.container = container;
    this.rippleEl = document.createElement('span');
    this.rippleEl.classList.add('ripple');
    const maxSize = Math.max( container.clientWidth, container.clientHeight );
    this.rippleEl.style.width = this.rippleEl.style.height = `${maxSize / 2}px`;
    container.appendChild( this.rippleEl );
    this.isActive = false;

    this.clickHandler = this.clickHandler.bind( this );
    this.disableAnimation = this.disableAnimation.bind( this );
    container.addEventListener('click', this.clickHandler );
  }

  clickHandler ({ pageX, pageY }) {
    if( this.isActive ) this.disableAnimation();

    this.isActive = true;

    const { offsetTop, offsetLeft } = this.container;
    const { clientWidth, clientHeight } = this.rippleEl;
    const top = offsetTop + ( clientHeight / 2 );
    const left = offsetLeft + ( clientWidth / 2 );

    this.rippleEl.style.left = `${pageX - left}px`;
    this.rippleEl.style.top = `${pageY - top}px`;

    this.rippleEl.classList.add('ripple_active');
    this.rippleEl.addEventListener('animationend', this.disableAnimation );
  }

  disableAnimation() {
    this.rippleEl.removeEventListener('animationend', this.disableAnimation );
    this.rippleEl.classList.remove('ripple_active');
    this.isActive = false;
  }

  destroy() {
    this.container.removeEventListener('click', this.clickHandler );
    this.rippleEl.removeEventListener('animationend', this.disableAnimation );
    this.container = this.rippleEl = null;
  }
};

const RippleTest = ({ children, ...rest }) => {

  const clickHandler = ({ pageX, pageY, currentTarget }) => {
    const { offsetTop, offsetLeft } = currentTarget;

    const ripple = document.createElement('span');
    const maxSize = Math.max( currentTarget.clientHeight, currentTarget.clientWidth );
    const radius = maxSize / 2;

    ripple.style.width = ripple.style.height = `${radius}px`;
    ripple.style.left = `${pageX - ( offsetLeft + radius / 2 )}px`;
    ripple.style.top = `${pageY - ( offsetTop + radius / 2 )}px`;

    const prevRipple = currentTarget.querySelector('.ripple_active');

    if( prevRipple ) prevRipple.remove();

    ripple.classList.add('ripple');
    ripple.classList.add('ripple_active');
    currentTarget.appendChild( ripple );
  }

  return(
    <div onClick={clickHandler} {...rest} style={{display:'inline-block',padding: '1px',background: 'pink',overflow: 'hidden',position: 'relative'}}>
      {children}
    </div>
  )
}