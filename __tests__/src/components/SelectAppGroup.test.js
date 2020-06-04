/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SelectAppGroup from '../../../src/components/SelectAppGroup';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('SelectAppGroup component tests', () => {
  const sampleProps = {
    appGroups: { HR: 'Human Resources', RAS: 'Research' },
    currentAppGroup: ''
  };
  test('Accessibility check', async () => {
    const wrapper = shallow(
      <main>
        <SelectAppGroup appGroups={sampleProps.appGroups} />
      </main>
    ); // Main tag is needed to prevent landmark errors
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  test('Snapshot test', () => {
    const wrapper = shallow(
      <SelectAppGroup appGroups={sampleProps.appGroups} />
    );
    expect(wrapper.find('option')).toHaveLength(3);
    expect(wrapper.state('selected')).toEqual('');
    expect(wrapper).toMatchSnapshot();
  });

  test('Sent appGroup is selected', () => {
    const wrapper = shallow(
      <SelectAppGroup appGroups={sampleProps.appGroups} currentAppGroup='RAS' />
    );
    expect(wrapper.find('option')).toHaveLength(3);
    expect(wrapper.state('selected')).toEqual('RAS');
  });
  test('Change selection', () => {
    let mockGetChangeCalled = '';
    const mockGetChange = newAppGroup => {
      mockGetChangeCalled = newAppGroup;
    };
    const wrapper = shallow(
      <SelectAppGroup
        appGroups={sampleProps.appGroups}
        getChange={mockGetChange}
      />
    );
    expect(wrapper.find('option')).toHaveLength(3);
    expect(wrapper.state('selected')).toEqual('');

    wrapper.instance().handleChange({ target: { value: 'HR' } });
    expect(mockGetChangeCalled).toEqual('HR');
    expect(wrapper.state('selected')).toEqual('HR');
  });
});
