/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router'; // https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303
import App from '../../../src/components/App';
import deployData from '../../../__fixtures__/getDataFormat/sheetData';
import { convertStringToDate } from '../../../src/js/getDates';

configure({ adapter: new Adapter() });

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('App  tests', () => {
  const sampleProps = {
    deployData,
    googleId: '1234567890'
  };
  test('Accessibility check', async () => {
    const div = document.createElement('div');
    div.id = sampleProps.id;
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/deploys']}>
        <App
          deployData={sampleProps.deployData}
          googleId={sampleProps.googleId}
        />
      </MemoryRouter>,
      { attachTo: div }
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  test('Snapshot tests', () => {
    const wrapper = shallow(
      <App
        deployData={sampleProps.deployData}
        googleId={sampleProps.googleId}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Deploy - no attributes', () => {
    const div = document.createElement('div');
    div.id = sampleProps.id;
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/deploys']}>
        <App
          deployData={sampleProps.deployData}
          googleId={sampleProps.googleId}
        />
      </MemoryRouter>,
      { attachTo: div }
    );
    expect(wrapper.find('Builds')).toHaveLength(1);
    expect(wrapper.find('Timeline')).toHaveLength(0);
    expect(wrapper.find('Builds').prop('currentAppGroup')).toEqual('');
    expect(wrapper.find('Builds').prop('startDate')).toBeUndefined();
    expect(wrapper.find('Builds').prop('endDate')).toBeUndefined();
  });
  test('Deploy - app group', () => {
    const div = document.createElement('div');
    div.id = sampleProps.id;
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/deploys/Foo']}>
        <App
          deployData={sampleProps.deployData}
          googleId={sampleProps.googleId}
        />
      </MemoryRouter>,
      { attachTo: div }
    );
    expect(wrapper.find('Builds')).toHaveLength(1);
    expect(wrapper.find('Timeline')).toHaveLength(0);
    expect(wrapper.find('Builds').prop('currentAppGroup')).toEqual('Foo');
    expect(wrapper.find('Builds').prop('startDate')).toBeUndefined();
    expect(wrapper.find('Builds').prop('endDate')).toBeUndefined();
  });
  test('Deploy - start/end dates', () => {
    const div = document.createElement('div');
    div.id = sampleProps.id;
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter
        initialEntries={['/deploys//startDate/2019-01-01/endDate/2019-02-02']}
      >
        <App
          deployData={sampleProps.deployData}
          googleId={sampleProps.googleId}
        />
      </MemoryRouter>,
      { attachTo: div }
    );
    expect(wrapper.find('Builds')).toHaveLength(1);
    expect(wrapper.find('Timeline')).toHaveLength(0);
    expect(wrapper.find('Builds').prop('currentAppGroup')).toEqual('');
    expect(wrapper.find('Builds').prop('startDate')).toEqual(
      convertStringToDate('2019-01-01')
    );
    expect(wrapper.find('Builds').prop('endDate')).toEqual(
      convertStringToDate('2019-02-02')
    );
  });
  test('Deploy - start/end dates and app group', () => {
    const div = document.createElement('div');
    div.id = sampleProps.id;
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[
          '/deploys/Foo/startDate/2019-01-01/endDate/2019-02-02'
        ]}
      >
        <App
          deployData={sampleProps.deployData}
          googleId={sampleProps.googleId}
        />
      </MemoryRouter>,
      { attachTo: div }
    );
    expect(wrapper.find('Builds')).toHaveLength(1);
    expect(wrapper.find('Timeline')).toHaveLength(0);
    expect(wrapper.find('Builds').prop('currentAppGroup')).toEqual('Foo');
    expect(wrapper.find('Builds').prop('startDate')).toEqual(
      convertStringToDate('2019-01-01')
    );
    expect(wrapper.find('Builds').prop('endDate')).toEqual(
      convertStringToDate('2019-02-02')
    );
  });
  test('Timeline - no attributes', () => {
    const div = document.createElement('div');
    div.id = sampleProps.id;
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/timeline']}>
        <App
          deployData={sampleProps.deployData}
          googleId={sampleProps.googleId}
        />
      </MemoryRouter>,
      { attachTo: div }
    );
    expect(wrapper.find('Builds')).toHaveLength(0);
    expect(wrapper.find('Timeline')).toHaveLength(1);
    expect(wrapper.find('Timeline').prop('currentAppGroup')).toEqual('');
    expect(wrapper.find('Timeline').prop('startDate')).toBeUndefined();
    expect(wrapper.find('Timeline').prop('endDate')).toBeUndefined();
  });
  test('Timeline - app group', () => {
    const div = document.createElement('div');
    div.id = sampleProps.id;
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/timeline/Foo']}>
        <App
          deployData={sampleProps.deployData}
          googleId={sampleProps.googleId}
        />
      </MemoryRouter>,
      { attachTo: div }
    );
    expect(wrapper.find('Builds')).toHaveLength(0);
    expect(wrapper.find('Timeline')).toHaveLength(1);
    expect(wrapper.find('Timeline').prop('currentAppGroup')).toEqual('Foo');
    expect(wrapper.find('Timeline').prop('startDate')).toBeUndefined();
    expect(wrapper.find('Timeline').prop('endDate')).toBeUndefined();
  });
  test('Timeline - start/end dates', () => {
    const div = document.createElement('div');
    div.id = sampleProps.id;
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter
        initialEntries={['/timeline//startDate/2019-01-01/endDate/2019-02-02']}
      >
        <App
          deployData={sampleProps.deployData}
          googleId={sampleProps.googleId}
        />
      </MemoryRouter>,
      { attachTo: div }
    );
    expect(wrapper.find('Builds')).toHaveLength(0);
    expect(wrapper.find('Timeline')).toHaveLength(1);
    expect(wrapper.find('Timeline').prop('currentAppGroup')).toEqual('');
    expect(wrapper.find('Timeline').prop('startDate')).toEqual(
      convertStringToDate('2019-01-01')
    );
    expect(wrapper.find('Timeline').prop('endDate')).toEqual(
      convertStringToDate('2019-02-02')
    );
  });
  test('Timeline - start/end dates and app group', () => {
    const div = document.createElement('div');
    div.id = sampleProps.id;
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[
          '/timeline/Foo/startDate/2019-01-01/endDate/2019-02-02'
        ]}
      >
        <App
          deployData={sampleProps.deployData}
          googleId={sampleProps.googleId}
        />
      </MemoryRouter>,
      { attachTo: div }
    );
    expect(wrapper.find('Builds')).toHaveLength(0);
    expect(wrapper.find('Timeline')).toHaveLength(1);
    expect(wrapper.find('Timeline').prop('currentAppGroup')).toEqual('Foo');
    expect(wrapper.find('Timeline').prop('startDate')).toEqual(
      convertStringToDate('2019-01-01')
    );
    expect(wrapper.find('Timeline').prop('endDate')).toEqual(
      convertStringToDate('2019-02-02')
    );
  });

  test('Show Error', () => {
    const div = document.createElement('div');
    div.id = sampleProps.id;
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/timeline']}>
        <App
          deployData={sampleProps.deployData}
          googleId={sampleProps.googleId}
          error='An error has occurred!'
        />
      </MemoryRouter>,
      { attachTo: div }
    );
    expect(wrapper.find('Builds')).toHaveLength(0);
    expect(wrapper.find('Timeline')).toHaveLength(0);
    expect(wrapper.find('Error')).toHaveLength(1);
  });
});
