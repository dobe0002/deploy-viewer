/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Timeline from '../../../src/components/Timeline';
import deployData from '../../../__fixtures__/getDataFormat/sheetData';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Timeline component tests', () => {
  const sampleProps = {
    deployData
  };

  test('Accessibility check', async () => {
    const div = document.createElement('div');
    div.id = 'popover2';
    document.body.appendChild(div);
    const wrapper = shallow(<Timeline deployData={sampleProps.deployData} />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
  test('Snapshot test', async () => {
    const div = document.createElement('div');
    div.id = 'popover2';
    document.body.appendChild(div);
    const wrapper = shallow(<Timeline deployData={sampleProps.deployData} />);
    expect(wrapper.find('TimelineRow')).toHaveLength(4);
    expect(wrapper).toMatchSnapshot();
  });
  test('Change app group', () => {
    const div = document.createElement('div');
    div.id = 'popover2';
    document.body.appendChild(div);
    const wrapper = shallow(<Timeline deployData={sampleProps.deployData} />);

    expect(wrapper.state('currentAppGroup')).toEqual('');
    expect(wrapper.find('TimelineRow')).toHaveLength(4);

    wrapper.instance().handleAppGroupChange('HR');
    expect(wrapper.state('currentAppGroup')).toEqual('HR');
    expect(wrapper.find('TimelineRow')).toHaveLength(2);
  });
  test('Change start and end dates', () => {
    const div = document.createElement('div');
    div.id = 'popover2';
    document.body.appendChild(div);
    const wrapper = shallow(<Timeline deployData={sampleProps.deployData} />);

    const startDate = new Date('2019-11-01T06:00:00.000Z');
    const endDate = new Date('2019-12-15T06:00:00.000Z');
    const newStartDate = new Date(2019, 10, 15);
    const newEndDate = new Date(2019, 11, 31);

    expect(wrapper.state('startDate')).toEqual(startDate);
    expect(wrapper.state('endDate')).toEqual(endDate);

    wrapper.instance().handleStartChange(newStartDate);
    expect(wrapper.state('startDate')).toEqual(newStartDate);
    expect(wrapper.state('endDate')).toEqual(endDate);

    wrapper.instance().handleEndChange(newEndDate);
    expect(wrapper.state('startDate')).toEqual(newStartDate);
    expect(wrapper.state('endDate')).toEqual(newEndDate);
  });
});
