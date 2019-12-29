import each from 'lodash/each';
import { min, max, eachDayOfInterval, format } from 'date-fns';

const getStartEndDate = deployData => {
  const allDates = [];
  each(deployData, app => {
    each(app.status, status => {
      allDates.push(status.date);
    });
  });

  const minDate = min(allDates);
  const maxDate = max(allDates);
  return { min: minDate, max: maxDate };
};

const getDates = (minDate, maxDate) => {
  const JSDateArray = eachDayOfInterval({
    start: minDate,
    end: maxDate
  });
  return JSDateArray.map(date => {
    const newDate = new Date(date);
    newDate.setUTCHours(6);
    newDate.setUTCMinutes(0);
    newDate.setUTCSeconds(0);
    newDate.setUTCMinutes(0);
    return newDate;
  });
};
const convertStringToDate = dateString => {
  if (dateString === undefined) {
    return dateString;
  }
  const dateArray = dateString.split('-');
  const month = parseInt(dateArray[0], 10) - 1;
  const day = parseInt(dateArray[1], 10);
  const year = parseInt(dateArray[2], 10);
  return new Date(year, month, day);
};
const convertDateToString = date => {
  return format(date, 'MM-dd-yyyy');
};

export { getStartEndDate, getDates, convertStringToDate, convertDateToString };
