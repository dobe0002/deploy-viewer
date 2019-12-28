// From: https://thenounproject.com/adamwhitcroft/uploads/?i=2614

import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from 'reactstrap';

const Error = ({ error }) => {
  return <Alert color='danger'>{error}</Alert>;
};

Error.propTypes = {
  error: PropTypes.string
};
Error.defaultProps = {
  error: 'There has been an error.'
};

export default Error;
