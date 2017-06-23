import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

import { MonthPickerNavigationPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import LeftArrow from '../svg/arrow-left.svg';
import RightArrow from '../svg/arrow-right.svg';
import ChevronUp from '../svg/chevron-up.svg';
import ChevronDown from '../svg/chevron-down.svg';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../../constants';

const propTypes = forbidExtraProps({
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  orientation: ScrollableOrientationShape,

  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(MonthPickerNavigationPhrases)),

  isRTL: PropTypes.bool,
});

const defaultProps = {
  navPrev: null,
  navNext: null,
  orientation: HORIZONTAL_ORIENTATION,

  onPrevClick() {},
  onNextClick() {},

  // internationalization
  phrases: MonthPickerNavigationPhrases,
  isRTL: false,
};

export default function PickerNavigation(props) {
  const {
    navPrev,
    navNext,
    onPrevClick,
    onNextClick,
    orientation,
    phrases,
    isRTL,
  } = props;

  const isVertical = orientation !== HORIZONTAL_ORIENTATION;
  const isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;

  let navPrevIcon = navPrev;
  let navNextIcon = navNext;
  let isDefaultNavPrev = false;
  let isDefaultNavNext = false;
  if (!navPrevIcon) {
    isDefaultNavPrev = true;
    navPrevIcon = isVertical ? <ChevronUp /> : <LeftArrow />;
    if (isRTL && !isVertical) {
      navPrevIcon = <RightArrow />;
    }
  }
  if (!navNextIcon) {
    isDefaultNavNext = true;
    navNextIcon = isVertical ? <ChevronDown /> : <RightArrow />;
    if (isRTL && !isVertical) {
      navNextIcon = <LeftArrow />;
    }
  }

  const navClassNames = cx('PickerNavigation', {
    'MonthPickerNavigation--horizontal': !isVertical,
    'MonthPickerNavigation--vertical': isVertical,
    'MonthPickerNavigation--vertical-scrollable': isVerticalScrollable,
  });
  const prevClassNames = cx('MonthPickerNavigation__prev', {
    'MonthPickerNavigation__prev--default': isDefaultNavPrev,
    'MonthPickerNavigation__prev--rtl': isRTL,
  });
  const nextClassNames = cx('MonthPickerNavigation__next', {
    'MonthPickerNavigation__next--default': isDefaultNavNext,
    'MonthPickerNavigation__next--rtl': isRTL,
  });

  return (
    <div className={navClassNames}>
      {!isVerticalScrollable && (
        <button
          type="button"
          aria-label={phrases.jumpToPrevMonth}
          className={prevClassNames}
          onClick={onPrevClick}
          onMouseUp={(e) => {
            e.currentTarget.blur();
          }}
        >
          {navPrevIcon}
        </button>
      )}

      <button
        type="button"
        aria-label={phrases.jumpToNextMonth}
        className={nextClassNames}
        onClick={onNextClick}
        onMouseUp={(e) => {
          e.currentTarget.blur();
        }}
      >
        {navNextIcon}
      </button>
    </div>
  );
}

PickerNavigation.propTypes = propTypes;
PickerNavigation.defaultProps = defaultProps;
