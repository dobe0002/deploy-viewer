import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import map from 'lodash/map';
import PropTypes from 'prop-types';

export default class SelectAppGroup extends React.Component {
  constructor(props) {
    super(props);
    const { currentAppGroup } = this.props;
    this.buildOptions = this.buildOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selected: currentAppGroup
    };
  }

  buildOptions() {
    const { appGroups } = this.props;
    return map(appGroups, (appDescr, appCode) => {
      return <option value={appCode}>{appDescr}</option>;
    });
  }

  handleChange(event) {
    const { getChange } = this.props;
    const newVal = event.target.value;
    this.setState({ selected: newVal });
    getChange(newVal);
  }

  render() {
    const { selected } = this.state;
    return (
      <FormGroup>
        <Label for='selectAppGroup'>App</Label>
        <Input
          type='select'
          name='select'
          id='selectAppGroup'
          value={selected}
          onChange={this.handleChange}
        >
          <option value=''>All Applications</option>
          {this.buildOptions()}
        </Input>
      </FormGroup>
    );
  }
}
SelectAppGroup.propTypes = {
  appGroups: PropTypes.objectOf,
  currentAppGroup: PropTypes.string,
  getChange: PropTypes.func
};
SelectAppGroup.defaultProps = {
  appGroups: {},
  currentAppGroup: '',
  getChange: () => {}
};
