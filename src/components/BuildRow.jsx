import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import Status from './Status';

const BuildRow = props => {
  const { appTitle, appStatus } = props;

  const rowStyle = {
    borderTop: '1px solid #ccc',
    paddingTop: '15px',
    paddingBottom: '15px'
  };
  const iconStyle = { marginRight: '10px', display: 'inline-block' };

  return (
    <Row style={rowStyle}>
      <Col xs='2'>
        <h2 className='h5'>{appTitle}</h2>
      </Col>
      <Col>
        {appStatus.map(status => {
          if (props.startDate !== '' && status.date < props.startDate) {
            return '';
          }
          if (props.endDate !== '' && status.date > props.endDate) {
            return '';
          }
          return (
            <div style={iconStyle} key={status.row}>
              <Status
                id={`popper${status.row}`}
                code={status.status}
                description={status.statusDescription}
                appTitle={appTitle}
                icon
                popOver
                dateString={status.dateString}
                note={status.note}
              />
            </div>
          );
        })}
      </Col>
    </Row>
  );
};

BuildRow.propTypes = {
  appTitle: PropTypes.string.isRequired,
  appStatus: PropTypes.arrayOf.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date)
};
BuildRow.defaultProps = {
  startDate: '',
  endDate: ''
};

export default BuildRow;
