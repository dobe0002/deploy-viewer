/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DarkClouds from '../../../../src/components/icons/DarkClouds';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Dark clouds icon component tests', () => {
  test('Accessibility check', async () => {
    const div1 = document.createElement('div');
    document.body.appendChild(div1);
    const wrapper = mount(
      <main>
        <DarkClouds />
      </main>,
      { attachTo: div1 }
    ); // Main tag is needed to prevent landmark errors
    const results = await axe(wrapper.getDOMNode());
    // console.log('Axe violations', results.violations);
    expect(results).toHaveNoViolations();
  });
  test('Loading is SVG based', () => {
    const loading = shallow(<DarkClouds />);
    expect(loading.find('svg')).toHaveLength(1);
  });
  test('Snapshot test', () => {
    const loading = mount(<DarkClouds />);
    expect(loading).toMatchSnapshot();
  });
});
