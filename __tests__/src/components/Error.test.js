/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Error from '../../../src/components/Error';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Dark clouds icon component tests', () => {
  test('Accessibility check', async () => {
    const wrapper = mount(<Error />);
    const results = await axe(wrapper.getDOMNode());
    // console.log('Axe violations', results.violations);
    expect(results).toHaveNoViolations();
    // console.log(wrapper.html());
  });
  test('Snapshot test', () => {
    const wrapper = shallow(<Error />);
    expect(wrapper.find('Alert')).toHaveLength(1);
  });
});
