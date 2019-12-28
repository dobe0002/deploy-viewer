import React from 'react';
// import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';

const FourOhFour = () => {
  return (
    <Alert color='danger'>
      Page not found. Please visit the
      <span> </span>
      <Link exact to='/deploys' className='alert-link'>
        Deploy Status page
      </Link>
    </Alert>
  );
};

export default FourOhFour;
