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
    expect(dates.min).toEqual(new Date(2019, 10, 1));
    expect(dates.max).toEqual(new Date(2019, 11, 15));
  });
  test('Get all dates between two dates', () => {
    const min = new Date(2019, 10, 25);
    const max = new Date(2019, 11, 5);
    const expected = [
      new Date(2019, 10, 25),
      new Date(2019, 10, 26),
      new Date(2019, 10, 27),
      new Date(2019, 10, 28),
      new Date(2019, 10, 29),
      new Date(2019, 10, 30),
      new Date(2019, 11, 1),
      new Date(2019, 11, 2),
      new Date(2019, 11, 3),
      new Date(2019, 11, 4),
      new Date(2019, 11, 5)
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
