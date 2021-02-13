import React from 'react';

const OPTIONS = {
  rootMargin: '0px',
  threshold: [0]
};

const ImageWithLazyLoad = (() => {

  const observerCb = ( entries ) => {
    entries.forEach(({ isIntersecting, target }) => {
      if( isIntersecting ) {
        observer.unobserve( target );
        target.src = target.getAttribute('data-src');
      }
    });
  }

  const observe = ( target ) => observer.observe( target );
  const unobserve = ( target ) => observer.unobserve( target );
  const observer = new IntersectionObserver( observerCb, OPTIONS );

  return ( Component ) => {

    return ({ isLazy, ...rest }) => {

      return isLazy ?
        <Component isLazy={isLazy} observe={observe} unobserve={unobserve} {...rest} /> :
        <Component {...rest} />
    }
  }

})();

export default ImageWithLazyLoad;