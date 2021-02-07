import React, { Fragment, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt, ...rest }) => {

  if( !src ) return <div style={{margin: 'auto'}} >image is't available</div>

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

  const imageLoaded = () => {
    setLoad( true );
  };

  const imageNotAvailable = () => {
    setError( true );
    setLoad( true );
  };

  return (
    <Fragment>
      <img ref={imgRef} src={src} alt={alt} {...rest} />
      { !isLoad && <div className="image-loading-layer">...loading</div> }
      { isError && <div className="image-loading-layer" >image is't available</div> }
    </Fragment>
  )
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;