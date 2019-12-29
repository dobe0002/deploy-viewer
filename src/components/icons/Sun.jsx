// From: https://thenounproject.com/term/sun/2660/

import React from 'react';
import PropTypes from 'prop-types';

const Sun = ({ size, color, alt }) => {
  return (
    <svg
      height={size}
      width={size}
      fill={color}
      aria-label={alt}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
      enableBackground='new 0 0 100 100'
      xmlSpace='preserve'
    >
      <path
        fill={color}
        d='M95.833,54.165h-8.33c-2.302,0-4.168-1.866-4.168-4.165c0-2.3,1.866-4.167,4.168-4.167h8.33
C98.134,45.833,100,47.7,100,50C100,52.299,98.139,54.165,95.833,54.165z'
      />
      <path
        fill={color}
        d='M79.468,26.431c-1.628,1.626-4.271,1.626-5.894,0c-1.627-1.627-1.627-4.265,0-5.893l5.894-5.892
c1.621-1.627,4.265-1.627,5.893,0c1.621,1.627,1.621,4.265,0,5.892L79.468,26.431z'
      />
      <path
        fill={color}
        d='M50.002,24.999c-13.81,0-25.003,11.193-25.003,25.001c0,13.806,11.195,24.999,25.003,24.999
S75.001,63.806,75.001,50C75.001,36.192,63.81,24.999,50.002,24.999z M50.002,66.667c-9.203,0-16.668-7.464-16.668-16.667
c0-9.205,7.463-16.667,16.668-16.667S66.667,40.795,66.667,50C66.667,59.203,59.205,66.667,50.002,66.667z'
      />
      <path
        fill={color}
        d='M50.002,16.667c-2.302,0-4.167-1.867-4.167-4.167V4.167C45.835,1.867,47.7,0,50.002,0
c2.302,0,4.167,1.867,4.167,4.167V12.5C54.169,14.8,52.299,16.667,50.002,16.667z'
      />
      <path
        fill={color}
        d='M20.538,26.431l-5.892-5.893c-1.627-1.626-1.627-4.265,0-5.892c1.627-1.627,4.265-1.627,5.892,0l5.893,5.892
c1.626,1.628,1.626,4.266,0,5.893C24.804,28.057,22.166,28.057,20.538,26.431z'
      />
      <path
        fill={color}
        d='M16.667,50c0,2.299-1.867,4.165-4.167,4.165H4.165C1.865,54.165,0,52.299,0,50
c0-2.3,1.867-4.167,4.165-4.167H12.5C14.802,45.833,16.667,47.7,16.667,50z'
      />
      <path
        fill={color}
        d='M20.538,73.57c1.628-1.626,4.266-1.626,5.893,0c1.626,1.626,1.626,4.265,0,5.893l-5.893,5.891
c-1.626,1.628-4.265,1.628-5.892,0c-1.627-1.625-1.627-4.265,0-5.891L20.538,73.57z'
      />
      <path
        fill={color}
        d='M50.002,83.333c2.302,0,4.167,1.864,4.167,4.165v8.335c0,2.301-1.865,4.167-4.167,4.167
c-2.302,0-4.167-1.866-4.167-4.167v-8.335C45.835,85.197,47.7,83.333,50.002,83.333z'
      />
      <path
        fill={color}
        d='M79.468,73.57l5.893,5.893c1.621,1.626,1.621,4.266,0,5.891c-1.628,1.628-4.271,1.628-5.893,0l-5.894-5.891
c-1.627-1.628-1.627-4.267,0-5.893C75.196,71.942,77.835,71.942,79.468,73.57z'
      />
    </svg>
  );
};

Sun.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  alt: PropTypes.string
};
Sun.defaultProps = {
  color: '#38761d',
  size: '50px',
  alt: 'Sun'
};

export default Sun;