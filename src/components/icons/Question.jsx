// From: https://thenounproject.com/search/?q=question&i=2177285

import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ size, color, alt }) => {
  return (
    <svg
      height={size}
      width={size}
      fill={color}
      aria-label={alt}
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
      style={{ enableBackground: 'new 0 0 100 100' }}
      xmlSpace='preserve'
    >
      <g>
        <path d='M42.5,80.5c0,4.7,3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S55.7,72,51,72S42.5,75.8,42.5,80.5z M55.5,80.5c0,2.5-2,4.5-4.5,4.5   s-4.5-2-4.5-4.5s2-4.5,4.5-4.5S55.5,78,55.5,80.5z' />
        <path d='M74.9,32.4c-0.7-12-10.4-21.6-22.4-22.4c-6.7-0.4-13.1,1.9-17.9,6.4c-4.8,4.5-7.5,10.9-7.5,17.4c0,1.1,0.9,2,2,2s2-0.9,2-2   c0-5.6,2.2-10.7,6.3-14.5c4.1-3.8,9.4-5.7,14.9-5.4c10,0.6,18,8.6,18.6,18.6c0.5,8.7-4.5,16.6-12.5,19.8C52.7,54.7,49,60,49,66   c0,1.1,0.9,2,2,2s2-0.9,2-2c0-4.3,2.7-8.2,6.8-9.8C69.5,52.4,75.5,42.8,74.9,32.4z' />
      </g>
    </svg>
  );
};

Question.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  alt: PropTypes.string
};
Question.defaultProps = {
  color: '#cccccc',
  size: '50px',
  alt: 'Rain'
};

export default Question;
