// From: https://thenounproject.com/adamwhitcroft/uploads/?i=2600

import React from 'react';
import PropTypes from 'prop-types';

const DarkClouds = ({ size, color, alt }) => {
  return (
    <svg
      height={size}
      width={size}
      fill={color}
      aria-label={alt}
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 100 68.18'
      enableBackground='new 0 0 100 68.18'
      xmlSpace='preserve'
    >
      <path
        fill={color}
        d='M2.668,49.997c-0.595-1.467-1.074-2.987-1.473-4.546H100c0,1.556-0.157,3.065-0.41,4.546H2.668z'
      />
      <path
        fill={color}
        d='M18.775,4.543C23.989,1.655,29.98,0,36.362,0c6.378,0,12.356,1.659,17.564,4.543H18.775z'
      />
      <path
        fill={color}
        d='M0.316,31.816c0.193-1.55,0.495-3.062,0.879-4.543h91.817c1.254,1.393,2.361,2.911,3.307,4.543H0.316z'
      />
      <path
        fill={color}
        d='M2.668,22.727c0.639-1.575,1.394-3.088,2.237-4.546h62.919c0.091,0.154,0.19,0.307,0.279,0.466
c1.51-0.26,3.043-0.466,4.621-0.466c5.571,0,10.75,1.677,15.062,4.546H2.668z'
      />
      <path
        fill={color}
        d='M8.003,13.635c1.318-1.644,2.785-3.155,4.364-4.546h48.01c1.567,1.386,3.015,2.909,4.324,4.546H8.003z'
      />
      <path
        fill={color}
        d='M99.585,40.905H0.316C0.13,39.414,0,37.904,0,36.364h98.413C98.928,37.824,99.325,39.342,99.585,40.905z'
      />
      <path
        fill={color}
        d='M98.413,54.542c-0.56,1.59-1.261,3.107-2.094,4.546H8.003c-1.147-1.43-2.175-2.952-3.098-4.546H98.413z'
      />
      <path
        fill={color}
        d='M12.367,63.634h80.644c-1.545,1.723-3.29,3.261-5.226,4.546h-69.01 C16.465,66.902,14.333,65.361,12.367,63.634z'
      />
    </svg>
  );
};

DarkClouds.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  alt: PropTypes.string
};
DarkClouds.defaultProps = {
  color: '#666666',
  size: '50px',
  alt: 'Dark clouds'
};
export default DarkClouds;
