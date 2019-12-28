/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import styled from 'styled-components';
import { Container, Row, Col, Table } from 'reactstrap';

import TimelineRow from './TimelineRow';
import TimelineHeaderRow from './TimelineHeaderRow';
import FilterDateAppGroup from './FilterDateAppGroup';
import { getStartEndDate, getDates, convertDateToString } from '../js/getDates';
import 'react-datepicker/dist/react-datepicker.min.css';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    const { deployData, currentAppGroup, startDate, endDate } = this.props;
    this.setAppRows = this.setAppRows.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleAppGroupChange = this.handleAppGroupChange.bind(this);
    this.setHistory = this.setHistory.bind(this);

    const dateRange = getStartEndDate(deployData);

    const sDate = startDate || dateRange.min;
    const eDate = endDate || dateRange.max;
    this.state = {
      startDate: sDate,
      endDate: eDate,
      dates: getDates(sDate, eDate),
      currentAppGroup
    };
  }

  setAppRows() {
    const { deployData } = this.props;
    const { dates, currentAppGroup } = this.state;
    return map(deployData, app => {
      if (currentAppGroup === '' || currentAppGroup === app.appGroup) {
        return (
          <TimelineRow
            key={app.appCode}
            dateArray={dates}
            appStatusArray={app.status}
            appTitle={app.title}
          />
        );
      }
      return '';
    });
  }

  setHistory() {
    const { history } = this.props;
    const { startDate, endDate, currentAppGroup } = this.state;
    const sDate = convertDateToString(startDate);
    const eDate = convertDateToString(endDate);

    history.push(
      `/timeline/${currentAppGroup}/startDate/${sDate}/endDate/${eDate}`
    );
  }

  handleAppGroupChange(newAppGroup) {
    // const { history } = this.props;
    this.setState({ currentAppGroup: newAppGroup }, () => {
      this.setHistory();
    });
  }

  handleStartChange(date) {
    const { endDate } = this.state;
    const newDates = getDates(date, endDate);
    this.setState(
      {
        startDate: date,
        dates: newDates
      },
      () => {
        this.setHistory();
      }
    );
  }

  handleEndChange(date) {
    const { startDate } = this.state;
    const newDates = getDates(startDate, date);
    this.setState(
      {
        endDate: date,
        dates: newDates
      },
      () => {
        this.setHistory();
      }
    );
  }

  render() {
    const TableDiv = styled.div`
      td,
      th {
        padding: 0.25rem;
      }
      tbody {
        td {
          text-align: center;
        }
      }
      thead {
        td {
          font-weight: bold;
        }
        th {
          font-weight: normal;
        }
      }
    `;

    const { startDate, endDate, dates, currentAppGroup } = this.state;
    const { appGroups } = this.props;
    return (
      <Container fluid>
        <FilterDateAppGroup
          dataTitle='Deploy Timeline'
          startDate={startDate}
          endDate={endDate}
          currentAppGroup={currentAppGroup}
          appGroups={appGroups}
          onStartDateChange={this.handleStartChange}
          onEndDateChange={this.handleEndChange}
          onAppGroupChange={this.handleAppGroupChange}
        />
        <Row>
          <Col>
            <TableDiv>
              <Table bordered striped hover>
                <TimelineHeaderRow dateArray={dates} />
                <tbody>{this.setAppRows()}</tbody>
              </Table>
            </TableDiv>
          </Col>
        </Row>
      </Container>
    );
  }
}

Timeline.propTypes = {
  deployData: PropTypes.arrayOf.isRequired,
  appGroups: PropTypes.objectOf,
  currentAppGroup: PropTypes.string,
  history: PropTypes.objectOf,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date)
};

Timeline.defaultProps = {
  appGroups: {},
  currentAppGroup: '',
  history: { push: () => {} },
  startDate: undefined,
  endDate: undefined
};
