const TIME_FRAME = 1000 / 60; // 60 frames in sec.
const EASING = {
  'linear': ( t ) => t,
  'ease-in': ( t ) => Math.pow( t, 2 ),
  'ease-out': ( t ) => 1 - Math.pow( 1 - t, 2 ),
  'ease-in-out': ( t ) => 0.5 * ( Math.sin( ( t - 0.5 ) * Math.PI ) + 1 ),
};

const easingAnimation = (( ms, animationName, animations ) => {

  function getNextStep( i, start, offset, isIncrease ) {
    const point = animations[ animationName ]( i ) * offset;
    return ( isIncrease ) ? start + point : start - point;
  }

  return ( start, offset, isIncrease ) => {

    let i = 0;
    const points = [];
    const duration = 1 / ( ms / TIME_FRAME );

    while ( true ) {

      if( i > 1 ) {
        points.push( getNextStep( 1, start, offset, isIncrease ) );
        break;
      }
      else points.push( getNextStep( i, start, offset, isIncrease ) );

      i += duration;
    }

    return points;
  }
})( 300, 'ease-in-out', EASING );

export default easingAnimation;