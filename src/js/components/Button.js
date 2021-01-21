import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ clickHandler, children, ...rest }) => (
  <button className="btn" onClick={clickHandler} {...rest} >{children}</button>
);

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default Button;