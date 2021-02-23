import polyfill from 'dynamic-polyfill';

polyfill({
  // fills: ['fetch', 'Set', 'Map', 'Array.prototype.from', 'IntersectionObserver'],
  fills: ['fetch', 'IntersectionObserver'],
  options: ['gated'],
  minify: ( NODE_ENV === 'development' ) ? false : true,
  rum: false,
  afterFill() {

    import('./initApp').then( module => module.default() );
    import('focus-visible').then( response => {} );
  }
});