import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';

const SneakersItem = React.memo(({ clickHandler, data: { name, retailPrice, imgUrl, sku, brand } }) => {

  return(
    <li className="sneakers-item" onClick={() => clickHandler( sku )} >
      <h3 className="title header">{name}</h3>
      <span className="brand">{brand}</span>
      <div className="container">
        {<span style={{margin: 'auto', transition: '.3s'}}>image</span>}
        {/*<Image className="img" src={imgUrl} alt={name} />*/}
      </div>
      <span className="price">{retailPrice ? 'From  $' + retailPrice : ''}</span>
      <div>
      </div>
    </li>
  );
});

SneakersItem.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    retailPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string ]),
    imgUrl: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired
  }),
};

export default SneakersItem;