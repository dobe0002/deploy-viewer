/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import FourOhFour from '../../../src/components/FourOhFour';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('404 component tests', () => {
  test('Accessibility check', async () => {
    const wrapper = mount(
      <Router>
        <FourOhFour />
      </Router>
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
  test('Snapshot test', () => {
    const wrapper = mount(
      <Router>
        <FourOhFour />
      </Router>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
