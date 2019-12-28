/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Popover from '../../../src/components/Popover';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Popover component tests', () => {
  const sampleProps = {
    id: 'myPopOverId',
    popOverTitle: 'This is my popover title',
    body: 'This is my popover body'
  };
  test('Accessibility check', async () => {
    const div = document.createElement('div');
    div.id = sampleProps.id;
    document.body.appendChild(div);
    const wrapper = mount(
      <Popover
        id={sampleProps.id}
        popOverTitle={sampleProps.popOverTitle}
        body={sampleProps.body}
      />,
      { attachTo: div }
    );
    const results = await axe(wrapper.getDOMNode());
    // console.log('Axe violations', results.violations);
    expect(results).toHaveNoViolations();
    // console.log(wrapper.html());
  });

  test('Snapshot test', () => {
    const div = document.createElement('div');
    div.id = sampleProps.id;
    document.body.appendChild(div);
    const loading = mount(
      <Popover
        id={sampleProps.id}
        popOverTitle={sampleProps.popOverTitle}
        body={sampleProps.body}
      />,
      { attachTo: div }
    );
    expect(loading).toMatchSnapshot();
  });
});
