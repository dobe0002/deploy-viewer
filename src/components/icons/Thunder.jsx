// From: https://thenounproject.com/adamwhitcroft/uploads/?i=2614

import React from 'react';
import PropTypes from 'prop-types';

const Thunder = ({ size, color, alt }) => {
  return (
    <svg
      height={size}
      width={size}
      fill={color}
      aria-label={alt}
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 99.999 100'
      enableBackground='new 0 0 99.999 100'
      xmlSpace='preserve'
    >
      <path
        fill={color}
        d='M72.724,72.729c-0.637,0-1.477,0-2.413,0l8.146-10.028c7.231-2.402,12.45-9.212,12.45-17.248
c0-10.041-8.14-18.178-18.182-18.178c-3.64,0-7.008,1.091-9.849,2.932C60.078,18.125,49.298,9.092,36.363,9.092
c-15.061,0-27.271,12.21-27.271,27.275c0,12.378,8.256,22.817,19.557,26.147L25.582,71.1C10.762,66.505,0,52.694,0,36.365
C0,16.284,16.281,0,36.363,0c13.646,0,25.522,7.528,31.742,18.648c1.509-0.26,3.041-0.466,4.621-0.466
c15.062,0,27.273,12.208,27.273,27.272C99.999,60.517,87.786,72.729,72.724,72.729z'
      />
      <polygon
        fill={color}
        points='45.453,40.908 68.178,40.908 54.542,63.638 70.45,63.638 40.907,100 49.089,72.729 34.088,72.729'
      />
    </svg>
  );
};

Thunder.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  alt: PropTypes.string
};
Thunder.defaultProps = {
  color: '#cc0000',
  size: '50px',
  alt: 'Thunder'
};

export default Thunder;
