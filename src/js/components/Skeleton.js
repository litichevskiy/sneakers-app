import React from 'react';

const Skeleton = ({ variant, ...rest }) => (
  <span className={`skeleton skeleton-${variant}`} {...rest}></span>
);

Skeleton.defaultProps = {
  variant: 'text',
};

export default Skeleton;