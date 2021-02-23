import React, { Fragment, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageWithLazyLoad from '../HOCs/ImageWithLazyLoad';

const IMG_NOT_AVAILABLE = "image is't available";

const Image = ({ src, alt, isLazy, observe, unobserve, imgColors, ...rest }) => {

  if( !src ) return imgAltContent( IMG_NOT_AVAILABLE, imgColors, false );

  const [isError, setError] = useState( false );
  const [isLoad, setLoad] = useState( false );
  const imgRef = useRef( null );

  useEffect(() => {

    imgRef.current.addEventListener('load', imageLoaded );
    imgRef.current.addEventListener('error', imageNotAvailable );
    return () => {

      imgRef.current.removeEventListener('load', imageLoaded );
      imgRef.current.removeEventListener('error', imageNotAvailable );
    }
  },[]);

  useEffect(() => {
    if( isLazy ) observe( imgRef.current );
    return () => {
      if( isLazy ) unobserve( imgRef.current );
    }
  },[])

  const imageLoaded = () => {
    setLoad( true );
  };

  const imageNotAvailable = () => {
    setError( true );
    setLoad( true );
  };

  if( isLazy ) {
    return (
      <Fragment>
        {isLazy ?
          <img ref={imgRef} data-src={src} alt={alt} {...rest} /> :
          <img ref={imgRef} src={src} alt={alt} {...rest} />
        }
        { !isError && imgAltContent('', imgColors, isLoad) }
        { isError && imgAltContent( IMG_NOT_AVAILABLE, imgColors, false ) }
      </Fragment>
    );
  }

  return (
    <Fragment>
        <img ref={imgRef} src={src} alt={alt} {...rest} />
      { isError && imgAltContent( IMG_NOT_AVAILABLE, imgColors, false ) }
    </Fragment>
  );
};

const imgAltContent = ( content, imgColors, isLoad ) => (
  <div
    style={{background: `${imgColors[0]}`, opacity: !isLoad ? 1 : 0 }}
    className="image-loading-layer">
    {content}
  </div>
);

Image.defaultProps = {
  isLazy: false,
  observe: () => {},
  unobserve: () => {},
  imgColors: ['#d2d2d2'],
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isLazy: PropTypes.bool,
  observe: PropTypes.func,
  unobserve: PropTypes.func,
  imgColors: PropTypes.array,
};

export default ImageWithLazyLoad( Image );