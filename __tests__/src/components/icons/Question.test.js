/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Question from '../../../../src/components/icons/Question';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Question icon component tests', () => {
  test('Accessibility check', async () => {
    const wrapper = mount(
      <main>
        <Question />
      </main>
    ); // Main tag is needed to prevent landmark errors
    const results = await axe(wrapper.getDOMNode());
    // console.log('Axe violations', results.violations);
    expect(results).toHaveNoViolations();
    // console.log(wrapper.html())
  });
  test('Loading is SVG based', () => {
    const loading = shallow(<Question />);
    expect(loading.find('svg')).toHaveLength(1);
  });
  test('Snapshot test', () => {
    const loading = shallow(<Question />);
    expect(loading).toMatchSnapshot();
  });
});
