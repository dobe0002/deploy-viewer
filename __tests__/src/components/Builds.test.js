/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Builds from '../../../src/components/Builds';
import deployData from '../../../__fixtures__/getDataFormat/sheetData';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Builds  tests', () => {
  const sampleProps = {
    deployData
  };
  test('Accessibility check', async () => {
    const wrapper = shallow(<Builds deployData={sampleProps.deployData} />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  test('Change in appgroup changes number of builds ', () => {
    const wrapper = shallow(<Builds deployData={sampleProps.deployData} />);
    wrapper.instance().handleAppGroupChange('HR');
    expect(wrapper.find('BuildRow')).toHaveLength(2);

    wrapper.instance().handleAppGroupChange('');
    expect(wrapper.find('BuildRow')).toHaveLength(4);
  });
  test('Call HandleStartChange', () => {
    const wrapper = shallow(<Builds deployData={sampleProps.deployData} />);
    expect(wrapper.state('startDate')).toEqual(
      new Date('2019-11-01T06:00:00.000Z')
    );

    const newDate = new Date(2019, 11, 12);
    wrapper.instance().handleStartChange(newDate);
    expect(wrapper.state('startDate')).toEqual(newDate);
  });

  test('Call HandleEndChange', () => {
    const wrapper = shallow(<Builds deployData={sampleProps.deployData} />);
    expect(wrapper.state('endDate')).toEqual(
      new Date('2019-12-15T06:00:00.000Z')
    );

    const newDate = new Date('2019-12-12T06:00:00.000Z');
    wrapper.instance().handleEndChange(newDate);
    expect(wrapper.state('endDate')).toEqual(newDate);
  });

  test('Snapshot test', () => {
    const wrapper = shallow(<Builds deployData={sampleProps.deployData} />);
    // check appGroup and # apps is correct
    expect(wrapper.find('BuildRow')).toHaveLength(4);
    expect(wrapper.state('currentAppGroup')).toEqual('');

    expect(wrapper).toMatchSnapshot();
  });
});
