import moment from 'moment';
import { expect } from 'chai';

import getCalendarYearMonths from '../../src/utils/getCalendarYearMonths';

const today = moment();
const monthsArray = getCalendarYearMonths(today);

describe('getCalendarYearMonths', () => {
  it('returns an array of arrays', () => {
    expect(monthsArray).to.be.instanceof(Array);

    monthsArray.forEach((months) => {
      expect(months).to.be.instanceof(Array);
    });
  });

  it('every array has four months on it', () => {
    monthsArray.forEach((months) => {
      expect(months.length).to.equal(3);
    });
  });
});
