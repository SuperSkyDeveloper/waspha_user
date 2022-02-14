import _ from 'lodash';
import moment, {duration} from 'moment';
import {
  TIME_FORMAT2,
  DATE_FORMAT2,
  DATE_TIME,
  TIME_FORMAT1,
} from '../constants';

/**
 *
 * @param {String} DateTime ISO String to be converted
 * @param {String} format Expected Format
 */
const ISOToFormat = (DateTime, format) => {
  if (moment(DateTime).format(format) === 'Invalid date') {
    return null;
  } else {
    return moment(DateTime).format(format);
  }
};

/**
 *
 * @param {String} DateTime Formatted time
 * @param {String} format Format of given time
 */
const toISOString = (DateTime, format) => {
  return moment(DateTime, format).toISOString();
};

// setTime = (value) => {
//   let time = ISOToFormat(value, TIME_FORMAT1);
//   let date = ISOToFormat(this.state.dateTime, DATE_FORMAT2);

//   let dateTime = `${date} ${time}`;

//   toISOString(dateTime, 'YYYY:MM:DD HH:MM:AA');
// };

const setDateTime = (time, date) => {
  let finalTime = ISOToFormat(time, TIME_FORMAT1);
  let finalDate = ISOToFormat(date, DATE_FORMAT2);
  let finalDateTime = `${finalDate} ${finalTime}`;
  return toISOString(finalDateTime, DATE_TIME);
};

const GetCurrentTimeInISO = () => {
  return moment().toISOString();
};

const getTimeDiff = time => {
  return moment(time).fromNow();
};

const human = date => {
  return moment.duration(moment().diff(date)).humanize();
};

const setTimer = date => {
  // Coundown timer for a given expiry date-time
  // You can set your own date-time
  let expirydate = date;

  let diffr = moment.duration(moment(expirydate).diff(moment()));
  // Difference of the expiry date-time
  let hours = parseInt(diffr.asHours());
  let minutes = parseInt(diffr.minutes());
  let seconds = parseInt(diffr.seconds());

  // Converting in seconds
  let totalSecond = hours * 60 * 60 + minutes * 60 + seconds;

  // Settign up the duration of countdown

  return totalSecond;
};

const checkEmptyOrNull = item => {
  if (_.isEmpty(item) || _.isNil(item)) {
    return null;
  } else {
    return item;
  }
};

export {
  toISOString,
  ISOToFormat,
  GetCurrentTimeInISO,
  setDateTime,
  getTimeDiff,
  human,
  setTimer,
  checkEmptyOrNull,
};
