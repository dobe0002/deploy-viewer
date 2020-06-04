/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loading from '../../../../src/components/icons/Loading';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Loading icon component tests', () => {
  test('Accessibility check', async () => {
    const wrapper = mount(
      <main>
        <Loading />
      </main>
    ); // Main tag is needed to prevent landmark errors
    const results = await axe(wrapper.getDOMNode());
    // console.log('Axe violations', results.violations);
    expect(results).toHaveNoViolations();
    // console.log(wrapper.html())
  });
  test('Loading is SVG based', () => {
    const loading = shallow(<Loading />);
    expect(loading.find('svg')).toHaveLength(1);
  });
  test('Snapshot test', () => {
    const loading = shallow(<Loading />);
    expect(loading).toMatchSnapshot();
  });
});
