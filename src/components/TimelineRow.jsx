import React from 'react';
import PropTypes from 'prop-types';
import { compareAsc } from 'date-fns';
import filter from 'lodash/filter';
import Status from './Status';

export default class TimelineRow extends React.Component {
  buildRow() {
    const { dateArray, appStatusArray, appTitle } = this.props;
    return dateArray.map(date => {
      const status = filter(
        appStatusArray,
        statusObj => compareAsc(statusObj.date, date) === 0
      );

      if (status.length === 0) return <td />;
      if (status.length === 1) {
        return (
          <Status
            key={status[0].row}
            code={status[0].status}
            appTitle={appTitle}
            description={status[0].statusDescription}
            dateString={status[0].dateString}
            note={status[0].note}
            tableCell
            popOver
            id={`popover${status[0].row}`}
          />
        );
      }

      return (
        <Status
          statuses={status}
          appTitle={appTitle}
          tableCell
          popOver
          key={status[0].row}
          code='M'
          id={`popover${status[0].row}`}
        />
      );
    });
  }

  render() {
    const { appTitle } = this.props;
    return (
      <tr>
        <th style={{ whiteSpace: 'nowrap' }}>{appTitle}</th>
        {this.buildRow()}
      </tr>
    );
  }
}

TimelineRow.propTypes = {
  dateArray: PropTypes.string,
  appStatusArray: PropTypes.arrayOf,
  appTitle: PropTypes.string
};
TimelineRow.defaultProps = {
  dateArray: [],
  appStatusArray: [],
  appTitle: ''
};
