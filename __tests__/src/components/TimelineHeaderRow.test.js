/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TimelineHeaderRow from '../../../src/components/TimelineHeaderRow';
import dateArray from '../../../__fixtures__/dateArray';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Timeline Header Row component tests', () => {
  const sampleProps = {
    dateArray
  };
  test('Accessibility check', async () => {
    const wrapper = shallow(
      <TimelineHeaderRow dateArray={sampleProps.dateArray} />
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
  test('Snapshot test', () => {
    const wrapper = shallow(
      <TimelineHeaderRow dateArray={sampleProps.dateArray} />
    );

    // There are Two months (and a blank cell)
    expect(
      wrapper
        .find('tr')
        .first()
        .find('td')
    ).toHaveLength(3);

    // number of dates
    expect(
      wrapper
        .find('tr')
        .at(1)
        .find('th')
    ).toHaveLength(32);
    // expect(wrapper).toMatchSnapshot();
  });
});
