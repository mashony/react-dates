import React, { PropTypes } from 'react';
import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

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
});

const defaultProps = {
  navPrev: null,
  navNext: null,
  orientation: HORIZONTAL_ORIENTATION,

  onPrevClick() {},
  onNextClick() {},
};

export default function PickerNavigation(props) {
  const {
    navPrev,
    navNext,
    onPrevClick,
    onNextClick,
    orientation,
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
  }
  if (!navNextIcon) {
    isDefaultNavNext = true;
    navNextIcon = isVertical ? <ChevronDown /> : <RightArrow />;
  }

  const navClassNames = cx('PickerNavigation', {
    'PickerNavigation--horizontal': !isVertical,
    'PickerNavigation--vertical': isVertical,
    'PickerNavigation--vertical-scrollable': isVerticalScrollable,
  });
  const prevClassNames = cx('PickerNavigation__prev', {
    'PickerNavigation__prev--default': isDefaultNavPrev,
  });
  const nextClassNames = cx('PickerNavigation__next', {
    'PickerNavigation__next--default': isDefaultNavNext,
  });

  return (
    <div className={navClassNames}>
      {!isVerticalScrollable &&
        <span
          className={prevClassNames}
          onClick={onPrevClick}
        >
          {navPrevIcon}
        </span>
      }

      <span
        className={nextClassNames}
        onClick={onNextClick}
      >
        {navNextIcon}
      </span>
    </div>
  );
}

PickerNavigation.propTypes = propTypes;
PickerNavigation.defaultProps = defaultProps;
