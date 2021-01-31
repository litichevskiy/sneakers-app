import polyfill from 'dynamic-polyfill';

polyfill({
  // fills: ['fetch', 'Set', 'Map', 'Array.from'],
  fills: ['fetch'],
  options: ['gated'],
  minify: ( NODE_ENV === 'development' ) ? false : true,
  rum: false,
  afterFill() {

    import('./initApp').then(module => {
      module.default();
    });

    import('focus-visible')
    .then(response => {
      console.log( 'focus-visible loaded' )
    });
  }
});

window.addEventListener('error',( event ) => {
  alert( event.message );
});