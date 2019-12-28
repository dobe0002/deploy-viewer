import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const BS4Popover = ({ id, popOverTitle, body, hover }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Popover
        placement='bottom'
        isOpen={popoverOpen}
        target={id}
        toggle={toggle}
        trigger={hover ? 'hover focus' : 'click'}
      >
        <PopoverHeader>{popOverTitle}</PopoverHeader>
        <PopoverBody>{body}</PopoverBody>
      </Popover>
    </div>
  );
};

BS4Popover.propTypes = {
  id: PropTypes.string,
  popOverTitle: PropTypes.string,
  body: PropTypes.string,
  hover: PropTypes.bool
};
BS4Popover.defaultProps = {
  id: 'popoverbutton',
  popOverTitle: '',
  body: '',
  hover: true
};

export default BS4Popover;
