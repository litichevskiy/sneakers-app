import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';

const SneakersItem = React.memo(({ clickHandler, data: { name, retailPrice, imgUrl, sku, brand, imgColors } }) => {

  const showDetails = ({ type, key }) => {
    if( type === 'click' ) clickHandler( sku );
    else if ( type === 'keypress' && key === 'Enter' ) clickHandler( sku );
  }

  return(
    <li
      onClick={showDetails}
      onKeyPress={showDetails}
      data-id={sku}
      aria-label={name}
      className="sneakers-item"
      tabIndex="0"
      role="button">
      <h3 className="title header">{name}</h3>
      <span className="brand">{brand}</span>
      <div className="container-image">
        {/*<span style={{margin: 'auto', transition: '.3s'}}>image</span>*/}
        {<Image className="img" src={imgUrl} alt={name} isLazy={true} imgColors={imgColors}/>}
      </div>
      <span className="price">{retailPrice ? 'From  $' + retailPrice : ''}</span>
    </li>
  );
});

SneakersItem.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    retailPrice: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    imgUrl: PropTypes.string.isRequired,
    sku: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired
  }),
  imgColors: PropTypes.array,
};

export default SneakersItem;