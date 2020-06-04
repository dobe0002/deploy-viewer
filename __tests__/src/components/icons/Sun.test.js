/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sun from '../../../../src/components/icons/Sun';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Sun icon  component tests', () => {
  test('Accessibility check', async () => {
    const wrapper = mount(
      <main>
        <Sun />
      </main>
    ); // Main tag is needed to prevent landmark errors
    const results = await axe(wrapper.getDOMNode());
    // console.log('Axe violations', results.violations);
    expect(results).toHaveNoViolations();
    // console.log(wrapper.html())
  });
  test('Loading is SVG based', () => {
    const loading = shallow(<Sun />);
    expect(loading.find('svg')).toHaveLength(1);
  });
  test('Snapshot test', () => {
    const loading = shallow(<Sun />);
    expect(loading).toMatchSnapshot();
  });
});
