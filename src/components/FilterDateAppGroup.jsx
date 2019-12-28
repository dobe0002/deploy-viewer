/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { FormGroup, Label, Form, Card, CardBody, Row, Col } from 'reactstrap';
import SelectAppGroup from './SelectAppGroup';

export default class FilterDateAppGroup extends React.Component {
  constructor(props) {
    super(props);

    const { startDate, endDate, currentAppGroup } = this.props;

    this.state = {
      startDate,
      endDate,
      currentAppGroup
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleAppGroupChange = this.handleAppGroupChange.bind(this);
  }

  handleStartChange(date) {
    const { onStartDateChange } = this.props;
    this.setState({ startDate: date });
    onStartDateChange(date);
  }

  handleEndChange(date) {
    const { onEndDateChange } = this.props;

    this.setState({ endDate: date });
    onEndDateChange(date);
  }

  handleAppGroupChange(newAppGroup) {
    const { onAppGroupChange } = this.props;
    this.setState({ currentAppGroup: newAppGroup });
    onAppGroupChange(newAppGroup);
  }

  render() {
    const { startDate, endDate, currentAppGroup } = this.state;
    const { appGroups, dataTitle } = this.props;
    const NavHeader = styled.div`
      input {
        height: calc(1.5em + 0.75rem + 2px);
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
      }
      label {
        font-weight: bold;
        padding-right: 10px;
        &:after {
          content: ':';
        }
      }
      .form-group {
        margin-right: 30px;
      }
      margin-top: 20px;
      margin-bottom: 20px;
    `;
    return (
      <NavHeader>
        <Row>
          {dataTitle !== '' && (
            <Col xs='3'>
              <h1>{dataTitle}</h1>
            </Col>
          )}
          <Col>
            <Card>
              <CardBody>
                <Form inline>
                  <FormGroup>
                    <Label for='timelineStartDate'>Start</Label>

                    <DatePicker
                      selected={startDate}
                      onChange={this.handleStartChange}
                      maxDate={endDate}
                      id='timelineStartDate'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='timelineEndDate'>End</Label>
                    <DatePicker
                      selected={endDate}
                      onChange={this.handleEndChange}
                      minDate={startDate}
                      id='timelineEndDate'
                    />
                  </FormGroup>

                  <SelectAppGroup
                    appGroups={appGroups}
                    getChange={this.handleAppGroupChange}
                    currentAppGroup={currentAppGroup}
                  />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </NavHeader>
    );
  }
}

FilterDateAppGroup.propTypes = {
  dataTitle: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  currentAppGroup: PropTypes.string,
  appGroups: PropTypes.objectOf,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  onAppGroupChange: PropTypes.func
};

FilterDateAppGroup.defaultProps = {
  dataTitle: '',
  startDate: new Date(),
  endDate: new Date(),
  currentAppGroup: '',
  appGroups: {},
  onStartDateChange: () => {},
  onEndDateChange: () => {},
  onAppGroupChange: () => {}
};
