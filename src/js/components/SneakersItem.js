import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';

const SneakersItem = React.memo(({ clickHandler, data: { name, retailPrice, imgUrl, sku } }) => {

  return(
    <li className="sneakers-item" onClick={() => clickHandler( sku )}>
      <p>{name}</p>
      <div className="container">
        <Image className="img" src={imgUrl} alt={name} />
      </div>
      <span style={{display: 'block'}}>{retailPrice ? '$' + retailPrice : 'n/a'}</span>
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