import React, { PropTypes } from 'react';
import moment from 'moment';
import cx from 'classnames';

import CalendarMonthOption from './CalendarMonthOption';

import getCalendarYearMonths from '../utils/getCalendarYearMonths';

import OrientationShape from '../shapes/OrientationShape';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';

const propTypes = {
  year: PropTypes.func,
  isVisible: PropTypes.bool,
  modifiers: PropTypes.object,
  orientation: OrientationShape,
  onMonthClick: PropTypes.func,
  onMonthMouseDown: PropTypes.func,
  onMonthMouseUp: PropTypes.func,
  onMonthMouseEnter: PropTypes.func,
  onMonthMouseLeave: PropTypes.func,
  onMonthTouchStart: PropTypes.func,
  onMonthTouchEnd: PropTypes.func,
  onMonthTouchTap: PropTypes.func,
  yearFormat: PropTypes.string,
};

const defaultProps = {
  year: () => moment(),
  isVisible: true,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  onMonthClick() {},
  onMonthMouseDown() {},
  onMonthMouseUp() {},
  onMonthMouseEnter() {},
  onMonthMouseLeave() {},
  onMonthTouchStart() {},
  onMonthTouchEnd() {},
  onMonthTouchTap() {},
  yearFormat: 'YYYY',
};

export function getModifiersForMonth(modifiers, month) {
  return month ? Object.keys(modifiers).filter(key => modifiers[key](month)) : [];
}

const getThunkFromMoment = year => () => year;

export default function CalendarYear(props) {
  const {
    year,
    yearFormat,
    orientation,
    isVisible,
    modifiers,
    onMonthClick,
    onMonthMouseDown,
    onMonthMouseUp,
    onMonthMouseEnter,
    onMonthMouseLeave,
    onMonthTouchStart,
    onMonthTouchEnd,
    onMonthTouchTap,
  } = props;

  const yearTitle = year().format(yearFormat);
  const calendarYearClasses = cx('CalendarYear', {
    'CalendarYear--horizontal': orientation === HORIZONTAL_ORIENTATION,
    'CalendarYear--vertical': orientation === VERTICAL_ORIENTATION,
  });

  return (
    <div className={calendarYearClasses} data-visible={isVisible}>
      <table>
        <caption className="CalendarYear__caption js-CalendarYear__caption">
          <strong>{yearTitle}</strong>
        </caption>

        <tbody className="js-CalendarYear__grid">
          {getCalendarYearMonths(year()).map((months, i) =>
            <tr key={i}>
              {months.map(month => {
                const modifiersForMonth = getModifiersForMonth(modifiers, month);
                const className = cx('CalendarYear__month',
                  modifiersForMonth.map(mod => `CalendarYear__month--${mod}`));

                return (
                  <td className={className} key={month}>
                    <CalendarMonthOption
                      month={getThunkFromMoment(month)}
                      modifiers={modifiersForMonth}
                      onMonthMouseEnter={onMonthMouseEnter}
                      onMonthMouseLeave={onMonthMouseLeave}
                      onMonthMouseDown={onMonthMouseDown}
                      onMonthMouseUp={onMonthMouseUp}
                      onMonthClick={onMonthClick}
                      onMonthTouchStart={onMonthTouchStart}
                      onMonthTouchEnd={onMonthTouchEnd}
                      onMonthTouchTap={onMonthTouchTap}
                    />
                  </td>
                );
              })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

CalendarYear.propTypes = propTypes;
CalendarYear.defaultProps = defaultProps;
