import React from 'react';
import PropTypes from 'prop-types';
import { getMonth, getDate, format } from 'date-fns';

export default class TimelineHeaderRow extends React.Component {
  monthRow() {
    const { dateArray } = this.props;
    const html = [];

    let currentMonth = getMonth(dateArray[0]);

    let currentCount = 0;

    dateArray.forEach(date => {
      if (getMonth(date) !== currentMonth) {
        html.push(
          <td colSpan={currentCount}>
            {format(new Date().setMonth(currentMonth), 'MMMM')}
          </td>
        );
        currentMonth = getMonth(date);
        currentCount = 1;
      } else currentCount += 1;
    });
    // need to capture the last:
    html.push(
      <td colSpan={currentCount}>
        {format(new Date().setMonth(currentMonth), 'MMMM')}
      </td>
    );

    return html;
  }

  render() {
    const { dateArray } = this.props;
    return (
      <thead>
        <tr>
          <td />
          {this.monthRow()}
        </tr>
        <tr>
          <td />
          {dateArray.map((date, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <th key={i}>{getDate(date)}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

TimelineHeaderRow.propTypes = {
  dateArray: PropTypes.string
};
TimelineHeaderRow.defaultProps = {
  dateArray: []
};
