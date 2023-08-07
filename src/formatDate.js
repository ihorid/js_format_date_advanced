'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  let dateToArr = [];
  const dateObject = {};
  const newFormatOfDate = [];
  let newFormatOfDateToReturn = '';

  for (let i = fromFormat.length - 1; i >= 0; i--) {
    if (i === fromFormat.length - 1) {
      dateToArr = date.split(fromFormat[i]);
      dateObject.separator = fromFormat[i];
    } else {
      dateObject[fromFormat[i]] = dateToArr[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (!toFormat[i].includes('Y') && i !== toFormat.length - 1) {
      if (dateObject.hasOwnProperty(toFormat[i])) {
        newFormatOfDate.push(dateObject[toFormat[i]]);
      };
    } else if (toFormat[i].includes('Y')) {
      if (dateObject.hasOwnProperty(toFormat[i])) {
        newFormatOfDate.push(dateObject[toFormat[i]]);
      } else {
        for (const key of Object.keys(dateObject)) {
          if (key.includes('Y')) {
            if (key.length === 2) {
              dateObject[key] = (dateObject[key] < 30) ? '20' + dateObject[key]
                : '19' + dateObject[key];
              newFormatOfDate.push(dateObject[key]);
            } else {
              dateObject[key] = dateObject[key].split('').slice(2).join('');
              newFormatOfDate.push(dateObject[key]);
            }
          }
        }
      }
    } else {
      newFormatOfDateToReturn = newFormatOfDate.join(toFormat[i]);
    }
  }

  return newFormatOfDateToReturn;
}

module.exports = formatDate;
