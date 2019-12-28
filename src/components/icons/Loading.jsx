// From: https://github.com/Dapper-Gentlemen/svg-loaders/blob/master/1.svg

import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ size, alt, color }) => {
  const svgStyle = { width: size, height: size };
  return (
    <svg
      role='img'
      aria-label={alt}
      version='1.1'
      id='svg-loader-1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 80 80'
      xmlSpace='preserve'
      style={svgStyle}
    >
      <path
        id='spinner'
        fill={color}
        d='M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6,28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z'
      >
        <animateTransform
          attributeType='xml'
          attributeName='transform'
          type='rotate'
          from='0 40 40'
          to='360 40 40'
          dur='1.0s'
          repeatCount='indefinite'
        />
      </path>
    </svg>
  );
};

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  alt: PropTypes.string
};
Loading.defaultProps = {
  color: '#575eff',
  size: '60px',
  alt: 'Loading'
};

export default Loading;
