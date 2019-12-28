import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { Container } from 'reactstrap';
import BuildRow from './BuildRow';
import { getStartEndDate, convertDateToString } from '../js/getDates';

import FilterDateAppGroup from './FilterDateAppGroup';

// TODO:  Need to fully incorporate the FilterDateAppGroup here

export default class Builds extends React.Component {
  constructor(props) {
    super(props);
    const { currentAppGroup, deployData, startDate, endDate } = this.props;
    const dateRange = getStartEndDate(deployData);

    const sDate = startDate || dateRange.min;
    const eDate = endDate || dateRange.max;
    this.state = {
      startDate: sDate,
      endDate: eDate,
      currentAppGroup
    };
    this.handleAppGroupChange = this.handleAppGroupChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.setHistory = this.setHistory.bind(this);
  }

  setHistory() {
    const { history } = this.props;
    const { startDate, endDate, currentAppGroup } = this.state;
    const sDate = convertDateToString(startDate);
    const eDate = convertDateToString(endDate);

    history.push(
      `/deploys/${currentAppGroup}/startDate/${sDate}/endDate/${eDate}`
    );
  }

  handleAppGroupChange(newAppGroup) {
    this.setState({ currentAppGroup: newAppGroup }, () => {
      this.setHistory();
    });
  }

  handleStartChange(date) {
    this.setState({ startDate: date }, () => {
      this.setHistory();
    });
  }

  handleEndChange(date) {
    this.setState({ endDate: date }, () => {
      this.setHistory();
    });
  }

  render() {
    const { appGroups, deployData } = this.props;
    const { currentAppGroup, startDate, endDate } = this.state;
    return (
      <Container fluid>
        <FilterDateAppGroup
          dataTitle='Deploy Status'
          startDate={startDate}
          endDate={endDate}
          currentAppGroup={currentAppGroup}
          appGroups={appGroups}
          onStartDateChange={this.handleStartChange}
          onEndDateChange={this.handleEndChange}
          onAppGroupChange={this.handleAppGroupChange}
        />

        {map(deployData, app => {
          if (currentAppGroup === '' || currentAppGroup === app.appGroup) {
            return (
              <BuildRow
                appTitle={app.title}
                appStatus={app.status}
                startDate={startDate}
                endDate={endDate}
              />
            );
          }
          return '';
        })}
      </Container>
    );
  }
}

Builds.propTypes = {
  deployData: PropTypes.arrayOf,
  appGroups: PropTypes.objectOf,
  currentAppGroup: PropTypes.string,
  history: PropTypes.objectOf,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date)
};
Builds.defaultProps = {
  deployData: [],
  appGroups: {},
  currentAppGroup: '',
  history: { push: () => {} },
  startDate: undefined,
  endDate: undefined
};
