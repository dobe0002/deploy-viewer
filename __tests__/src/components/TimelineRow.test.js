/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TimelineRow from '../../../src/components/TimelineRow';
import dateArray from '../../../__fixtures__/dateArray';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Timeline component tests', () => {
  const sampleProps = {
    dateArray,
    appTitle: 'Training Hub',
    appStatusArray: [
      {
        row: 2,
        status: 'B',
        statusDescription: 'Bad Deployment',
        dateString: '11/01/2019',
        date: new Date(2019, 10, 1), // '2019-11-01T05:00:00.000Z',
        note: 'Ooopsie!'
      },
      {
        row: 4,
        status: 'G',
        statusDescription: 'Good deployment',
        dateString: '11/10/2019',
        date: new Date(2019, 10, 10), // '2019-11-10T06:00:00.000Z',
        note: 'Some stuff happened but it was ALL GOOD'
      }
    ]
  };
  test('Accessibility check', async () => {
    const wrapper = shallow(
      <TimelineRow
        dateArray={sampleProps.dateArray}
        appTitle={sampleProps.appTitle}
        appStatusArray={sampleProps.appStatusArray}
      />
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
  test('Snapshot test', () => {
    const wrapper = shallow(
      <TimelineRow
        dateArray={sampleProps.dateArray}
        appTitle={sampleProps.appTitle}
        appStatusArray={sampleProps.appStatusArray}
      />
    );
    expect(wrapper.find('tr')).toHaveLength(1);
    expect(wrapper.find('th')).toHaveLength(1);
    expect(wrapper.find('Status')).toHaveLength(2);
    expect(wrapper.find('td')).toHaveLength(30);
    expect(wrapper).toMatchSnapshot();
  });
});
