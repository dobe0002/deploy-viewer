/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilterDateAppGroup from '../../../src/components/FilterDateAppGroup';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('FilterDateAppGroup  tests', () => {
  let startDate = '';
  let endDate = '';
  let currentAppGroup = '';
  const setStartDateMock = date => {
    startDate = date;
  };
  const setEndDateMock = date => {
    endDate = date;
  };
  const setAppGroupMock = appGroup => {
    currentAppGroup = appGroup;
  };
  const sampleProps = {
    startDate: new Date('2019-02-01T06:00:00.000Z'),
    endDate: new Date('2019-03-02T06:00:00.000Z'),
    currentAppGroup: '',
    appGroups: {},
    onStartDateChange: setStartDateMock,
    onEndDateChange: setEndDateMock,
    onAppGroupChange: setAppGroupMock
  };

  beforeEach(() => {
    startDate = '';
    endDate = '';
    currentAppGroup = '';
  });

  test('Accessibility check', async () => {
    const wrapper = shallow(
      <main>
        <FilterDateAppGroup />
      </main>
    ); // Main tag is needed to prevent landmark errors
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
  test('Snapshot test', () => {
    const wrapper = shallow(
      <FilterDateAppGroup
        startDate={sampleProps.startDate}
        endDate={sampleProps.endDate}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('Call handleStartChange', () => {
    expect(startDate).toEqual('');
    const wrapper = shallow(
      <FilterDateAppGroup
        onStartDateChange={sampleProps.onStartDateChange}
        startDate={sampleProps.startDate}
      />
    );
    expect(wrapper.state('startDate')).toEqual(sampleProps.startDate);

    const newStartTestDate = new Date(2019, 11, 12);
    wrapper.instance().handleStartChange(newStartTestDate);
    expect(wrapper.state('startDate')).toEqual(newStartTestDate);
    expect(startDate).toEqual(newStartTestDate);
  });
  test('Call handleEndChange', () => {
    expect(endDate).toEqual('');
    const wrapper = shallow(
      <FilterDateAppGroup
        onEndDateChange={sampleProps.onEndDateChange}
        endDate={sampleProps.endDate}
      />
    );
    expect(wrapper.state('endDate')).toEqual(sampleProps.endDate);

    const newEndTestDate = new Date(2019, 11, 22);
    wrapper.instance().handleEndChange(newEndTestDate);
    expect(wrapper.state('endDate')).toEqual(newEndTestDate);
    expect(endDate).toEqual(newEndTestDate);
  });
  test('Call handleAppGroupChange', () => {
    expect(currentAppGroup).toEqual('');
    const wrapper = shallow(
      <FilterDateAppGroup
        onAppGroupChange={sampleProps.onAppGroupChange}
        currentAppGroup='Foo'
      />
    );
    expect(wrapper.state('currentAppGroup')).toEqual('Foo');

    wrapper.instance().handleAppGroupChange('Boo');
    expect(wrapper.state('currentAppGroup')).toEqual('Boo');
    expect(currentAppGroup).toEqual('Boo');
  });
});
