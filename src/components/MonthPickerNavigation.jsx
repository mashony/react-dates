import React, { PropTypes } from 'react';
import cx from 'classnames';

import LeftArrow from '../svg/arrow-left.svg';
import RightArrow from '../svg/arrow-right.svg';
import ChevronUp from '../svg/chevron-up.svg';
import ChevronDown from '../svg/chevron-down.svg';

const propTypes = {
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  isVertical: PropTypes.bool,

  onPrevYearClick: PropTypes.func,
  onNextYearClick: PropTypes.func,
};
const defaultProps = {
  navPrev: null,
  navNext: null,
  isVertical: false,

  onPrevYearClick() {},
  onNextYearClick() {},
};

export default function MonthPickerNavigation(props) {
  const {
    navPrev,
    navNext,
    isVertical,
    onPrevYearClick,
    onNextYearClick,
  } = props;

  let navPrevIcon = navPrev;
  let navNextIcon = navNext;
  let isDefaultNavPrev = false;
  let isDefaultNavNext = false;
  if (!navPrevIcon) {
    isDefaultNavPrev = true;
    navPrevIcon = isVertical ? <ChevronUp /> : <LeftArrow />;
  }
  if (!navNextIcon) {
    isDefaultNavNext = true;
    navNextIcon = isVertical ? <ChevronDown /> : <RightArrow />;
  }

  const navClassNames = cx('MonthPickerNavigation', {
    'MonthPickerNavigation--horizontal': !isVertical,
    'MonthPickerNavigation--vertical': isVertical,
  });
  const prevClassNames = cx('MonthPickerNavigation__prev', {
    'MonthPickerNavigation__prev--default': isDefaultNavPrev,
  });
  const nextClassNames = cx('MonthPickerNavigation__next', {
    'MonthPickerNavigation__next--default': isDefaultNavNext,
  });

  return (
    <div className={navClassNames}>
      <span
        className={prevClassNames}
        onClick={onPrevYearClick}
      >
        {navPrevIcon}
      </span>

      <span
        className={nextClassNames}
        onClick={onNextYearClick}
      >
        {navNextIcon}
      </span>
    </div>
  );
}

MonthPickerNavigation.propTypes = propTypes;
MonthPickerNavigation.defaultProps = defaultProps;
