/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildRow from '../../../src/components/BuildRow';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Build Rows tests', () => {
  const sampleProps = {
    appTitle: 'My application',
    appStatus: [
      {
        row: 3,
        status: 'G',
        statusDescription: 'Good deployment',
        dateString: '11/02/2019',
        date: new Date(2019, 10, 2),
        note: 'Hooray everything went to plan'
      },
      {
        row: 5,
        status: 'O',
        statusDescription: 'Outage',
        dateString: '11/10/2019',
        date: new Date(2019, 10, 10),
        note: 'People are trashing the database'
      }
    ]
  };
  test('Accessibility check', async () => {
    const wrapper = shallow(
      <main>
        <BuildRow
          appTitle={sampleProps.appTitle}
          appStatus={sampleProps.appStatus}
        />
      </main>
    ); // Main tag is needed to prevent landmark errors
    const results = await axe(wrapper.html());
    // console.log('Axe violations', results.violations);
    expect(results).toHaveNoViolations();
    // console.log(wrapper.html());
  });
  test('Change start date', () => {
    const wrapper = shallow(
      <BuildRow
        appTitle={sampleProps.appTitle}
        appStatus={sampleProps.appStatus}
        startDate={new Date(2019, 10, 3)}
      />
    );
    expect(wrapper.find('Status')).toHaveLength(1);
    expect(wrapper.find('Status').prop('code')).toEqual('O');
  });
  test('Change end date', () => {
    const wrapper = shallow(
      <BuildRow
        appTitle={sampleProps.appTitle}
        appStatus={sampleProps.appStatus}
        endDate={new Date(2019, 10, 3)}
      />
    );
    expect(wrapper.find('Status')).toHaveLength(1);
    expect(wrapper.find('Status').prop('code')).toEqual('G');
  });

  test('Snapshot test', () => {
    const wrapper = shallow(
      <BuildRow
        appTitle={sampleProps.appTitle}
        appStatus={sampleProps.appStatus}
      />
    );
    expect(wrapper.find('Status')).toHaveLength(2);
    expect(wrapper.find('h2').text()).toEqual(sampleProps.appTitle);
    expect(wrapper).toMatchSnapshot();
  });
});
