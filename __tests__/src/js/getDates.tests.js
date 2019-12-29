import {
  getStartEndDate,
  getDates,
  convertStringToDate,
  convertDateToString
} from '../../../src/js/getDates';
import deployData from '../../../__fixtures__/getDataFormat/sheetData';

describe('Get Dates functions', () => {
  test('Get min and max dates from deploy data', () => {
    const dates = getStartEndDate(deployData);
    expect(dates.min).toEqual(new Date('2019-11-01T06:00:00.000Z'));
    expect(dates.max).toEqual(new Date('2019-12-15T06:00:00.000Z'));
  });
  test('Get all dates between two dates', () => {
    const min = new Date('2019-11-25T06:00:00.000Z');
    const max = new Date('2019-12-05T06:00:00.000Z');
    const expected = [
      new Date('2019-11-25T06:00:00.000Z'),
      new Date('2019-11-26T06:00:00.000Z'),
      new Date('2019-11-27T06:00:00.000Z'),
      new Date('2019-11-28T06:00:00.000Z'),
      new Date('2019-11-29T06:00:00.000Z'),
      new Date('2019-11-30T06:00:00.000Z'),
      new Date('2019-12-01T06:00:00.000Z'),
      new Date('2019-12-02T06:00:00.000Z'),
      new Date('2019-12-03T06:00:00.000Z'),
      new Date('2019-12-04T06:00:00.000Z'),
      new Date('2019-12-05T06:00:00.000Z')
    ];
    expect(getDates(min, max)).toEqual(expected);
  });
  test('Convert string to date', () => {
    const dateString = '02-05-2019';
    const newDate = convertStringToDate(dateString);

    expect(newDate.getMonth()).toEqual(1);
    expect(newDate.getDate()).toEqual(5);
    expect(newDate.getFullYear()).toEqual(2019);
  });
  test('Convert date to string', () => {
    const newDate = new Date(2019, 3, 9);
    expect(convertDateToString(newDate)).toEqual('04-09-2019');
  });
});
