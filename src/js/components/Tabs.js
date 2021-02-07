import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Tabs = ({ children, index, ...rest }) => {

  const [activeIndex, setActiveIndex] = React.useState( index );
  const changeActiveTab = ( index ) => setActiveIndex( index );

  return(
    <div className="tabs-container" {...rest} >
      <div className="tabs-navigations">
        {React.Children.map( children, ({props:{ label }}, index ) =>
          <button
            key={label}
            onClick={() => changeActiveTab( index )}
            className={activeIndex === index ? 'tabs-btn tabs-btn--active' : 'tabs-btn'}>
            {label}
          </button>
        )}
      </div>
      {children[activeIndex]}
    </div>
  )
};

export const Tab = ({ children, label }) => children;

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

Tabs.defaultProps = {
  index: 0
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number,
};