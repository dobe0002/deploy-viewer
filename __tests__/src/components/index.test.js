/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import deployData from '../../../__fixtures__/getDataFormat/sheetData';
import JSON5 from 'json5';
import axios from 'axios';
import fs from 'fs';
import MainApp from '../../../src/components/index';

configure({ adapter: new Adapter() });

jest.mock('react-dom');

describe('Index.jsx  tests', () => {
  let rawGoogleData = '';
  beforeAll(() => {
    rawGoogleData = JSON5.parse(
      fs.readFileSync('./__fixtures__/deploySheetFromGoogle.json5')
    );
    axios.setDeployData(rawGoogleData);
    axios.setError('');
  });
  test('App is rendered', () => {
    expect(ReactDOM.render).toBeCalled();
  });
  test('Loader is showing when component first loads', async done => {
    const wrapper = shallow(<MainApp />);
    expect(wrapper.find('Loading')).toHaveLength(1);
    expect(wrapper.state('showLoader')).toBe(true);
    expect(wrapper.state('deployData')).toEqual([]);
    setTimeout(() => {
      // timeout is a cheap way to wait for data load to complete
      expect(wrapper.find('Loading')).toHaveLength(0);
      expect(wrapper.state('error')).toEqual('');
      expect(wrapper.state('deployData')).not.toEqual([]);
      expect(wrapper.state('appGroups')).not.toEqual({});
      done();
    }, 1000);
  });
  test('Error getting data', async done => {
    axios.setError('Error getting data');
    const wrapper = shallow(<MainApp />);
    expect(wrapper.find('Loading')).toHaveLength(1);
    expect(wrapper.state('showLoader')).toBe(true);
    setTimeout(() => {
      // timeout is a cheap way to wait for data load to complete
      expect(wrapper.find('Loading')).toHaveLength(0);
      expect(wrapper.state('error')).not.toEqual('');
      done();
    }, 1000);
  });
});
