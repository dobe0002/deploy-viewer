import JSON5 from 'json5';
import axios from 'axios';
import fs from 'fs';
import expectedData from '../../../__fixtures__/getDataFormat/sheetData';
import GetData from '../../../src/js/getData';

let getData = '';

let rawGoogleData = '';

describe('Get Data', () => {
  beforeAll(() => {
    rawGoogleData = JSON5.parse(
      fs.readFileSync('./__fixtures__/deploySheetFromGoogle.json5')
    );
    axios.setDeployData(rawGoogleData);
  });
  beforeEach(() => {
    const docId = '1234';
    getData = new GetData(docId);
    axios.setError('');
    axios.resetCalls();
  });
  // NOTE: This test was included for development ... it can be removed
  test('Google URLs', done => {
    const dataURL =
      'https://spreadsheets.google.com/feeds/list/1234/1/public/full?alt=json';
    expect(getData.url).toEqual(dataURL);
    done();
  });

  // NOTE: This test was included for development ... it can be removed
  test('Format deploy data', done => {
    const sheetData = getData.formatData(rawGoogleData);
    expect(sheetData).toEqual(expectedData);
    done();
  });
  test('Get Deploy Data', done => {
    getData.getDeployData((error, sheetData) => {
      expect(error).toBeNull();
      expect(sheetData).toEqual(expectedData);
      done();
    });
  });

  test('Get App Groups (have not called Google yet - aka getDeployData has not been run)', done => {
    expect(getData.appGroups).toEqual({});
    expect(getData.deployData).toEqual({});
    expect(axios.getCalls()).toHaveLength(0);

    getData.getGroups((error, groupObject) => {
      expect(axios.getCalls()).toHaveLength(1);
      expect(getData.deployData).toEqual(expectedData);
      const groupExpected = {
        HR: 'Human Resources',
        RAS: 'Research',
        STU: 'Student'
      };
      expect(groupObject).toEqual(groupExpected);
      done();
    });
  });

  test('Get App Groups (has Google data - aka getDeployData has already been run)', done => {
    getData.getDeployData(error => {
      expect(error).not.toBeNull();
      expect(getData.deployData).toEqual(expectedData);

      axios.resetCalls();
      // true test starts here.  Can we call getData.getGroups without an additional ajax call if getDeployData has already been called.
      getData.getGroups((errorGetGroups, groupObject) => {
        const groupExpected = {
          HR: 'Human Resources',
          RAS: 'Research',
          STU: 'Student'
        };
        expect(axios.getCalls()).toHaveLength(0);
        expect(groupObject).toEqual(groupExpected);
        expect(errorGetGroups).toBeNull();
        done();
      });
    });
  });

  test('Get Deploy Data - Error', done => {
    axios.setError('Error!');
    getData.getDeployData(error => {
      expect(error).not.toBeNull();
      done();
    });
  });
  test('Get Deploy Data - Format error', done => {
    axios.setDeployData({});
    getData.getDeployData(error => {
      expect(error).not.toBeNull();
      expect(typeof error).toEqual('string');
      done();
    });
  });
  test('verifyFormat', () => {
    expect(GetData.verifyFormat(rawGoogleData)).toBeNull();
  });
  test('Verify format - missing feed', () => {
    const badData = {};
    const isFormat = GetData.verifyFormat(badData);
    expect(isFormat).not.toBeNull();
    expect(typeof isFormat).toEqual('string');
    expect(isFormat).toEqual('No data was sent from the Google spreadsheet.');
  });
  test('Verify format - missing entry', () => {
    const badData = { feed: {} };
    const isFormat = GetData.verifyFormat(badData);
    expect(isFormat).not.toBeNull();
    expect(typeof isFormat).toEqual('string');
    expect(isFormat).toEqual('No data was sent from the Google spreadsheet.');
  });
  test('Verify format -  entry length of 0', () => {
    const badData = { feed: { entry: [] } };
    const isFormat = GetData.verifyFormat(badData);
    expect(isFormat).not.toBeNull();
    expect(typeof isFormat).toEqual('string');
    expect(isFormat).toEqual('No data was sent from the Google spreadsheet.');
  });
  test('Verify format -  Missing app title', () => {
    const badData = { feed: { entry: [{}] } };
    const isFormat = GetData.verifyFormat(badData);
    expect(isFormat).not.toBeNull();
    expect(typeof isFormat).toEqual('string');
    expect(isFormat).toEqual('Application title is not available.');
  });
  test('Verify format -  Missing app code', () => {
    const badData = {
      feed: {
        entry: [
          {
            gsx$app: { $t: 'app Title' }
          }
        ]
      }
    };
    const isFormat = GetData.verifyFormat(badData);
    expect(isFormat).not.toBeNull();
    expect(typeof isFormat).toEqual('string');
    expect(isFormat).toEqual('Application code is not available.');
  });
  test('Verify format -  Missing app group code', () => {
    const badData = {
      feed: {
        entry: [
          {
            gsx$app: { $t: 'app Title' },
            gsx$appcode: { $t: 'app code' }
          }
        ]
      }
    };
    const isFormat = GetData.verifyFormat(badData);
    expect(isFormat).not.toBeNull();
    expect(typeof isFormat).toEqual('string');
    expect(isFormat).toEqual('Application group code is not available.');
  });
  test('Verify format -  Missing app group', () => {
    const badData = {
      feed: {
        entry: [
          {
            gsx$app: { $t: 'app Title' },
            gsx$appcode: { $t: 'app code' },
            gsx$groupcode: { $t: 'app group code' }
          }
        ]
      }
    };
    const isFormat = GetData.verifyFormat(badData);
    expect(isFormat).not.toBeNull();
    expect(typeof isFormat).toEqual('string');
    expect(isFormat).toEqual('Application group is not available.');
  });
  test('Verify format -  Missing date', () => {
    const badData = {
      feed: {
        entry: [
          {
            gsx$app: { $t: 'app Title' },
            gsx$appcode: { $t: 'app code' },
            gsx$groupcode: { $t: 'app group code' },
            gsx$appgroup: { $t: 'app group name' }
          }
        ]
      }
    };
    const isFormat = GetData.verifyFormat(badData);
    expect(isFormat).not.toBeNull();
    expect(typeof isFormat).toEqual('string');
    expect(isFormat).toEqual('Event date is not available.');
  });
  test('Verify format -  Missing event code', () => {
    const badData = {
      feed: {
        entry: [
          {
            gsx$app: { $t: 'app Title' },
            gsx$appcode: { $t: 'app code' },
            gsx$groupcode: { $t: 'app group code' },
            gsx$appgroup: { $t: 'app group name' },
            gsx$date: { $t: 'event date' }
          }
        ]
      }
    };
    const isFormat = GetData.verifyFormat(badData);
    expect(isFormat).not.toBeNull();
    expect(typeof isFormat).toEqual('string');
    expect(isFormat).toEqual('Event code is not available.');
  });
  test('Verify format -  Missing event description', () => {
    const badData = {
      feed: {
        entry: [
          {
            gsx$app: { $t: 'app Title' },
            gsx$appcode: { $t: 'app code' },
            gsx$groupcode: { $t: 'app group code' },
            gsx$appgroup: { $t: 'app group name' },
            gsx$date: { $t: 'event date' },
            gsx$eventcode: { $t: 'event code' }
          }
        ]
      }
    };
    const isFormat = GetData.verifyFormat(badData);
    expect(isFormat).not.toBeNull();
    expect(typeof isFormat).toEqual('string');
    expect(isFormat).toEqual('Event description is not available.');
  });
});
