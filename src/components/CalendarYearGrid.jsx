import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import cx from 'classnames';

import CalendarYear from './CalendarYear';

import isTransitionEndSupported from '../utils/isTransitionEndSupported';
import getTransformStyles from '../utils/getTransformStyles';

import OrientationShape from '../shapes/OrientationShape';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';

const propTypes = {
  initialYear: PropTypes.func,
  firstVisibleYearIndex: PropTypes.number,
  isAnimating: PropTypes.bool,
  numberOfYears: PropTypes.number,
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
  onYearTransitionEnd: PropTypes.func,
  transformValue: PropTypes.string,
  yearFormat: PropTypes.string,
};

const defaultProps = {
  initialYear: () => moment(),
  firstVisibleYearIndex: 0,
  isAnimating: false,
  numberOfYears: 1,
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
  onYearTransitionEnd() {},
  transform: 'none',
  yearFormat: 'YYYY',
};

export default class CalendarYearGrid extends React.Component {
  constructor(props) {
    super(props);

    this.isTransitionEndSupported = isTransitionEndSupported();
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  componentDidMount() {
    this.container = ReactDOM.findDOMNode(this.containerRef);
    this.container.addEventListener('transitionend', this.onTransitionEnd);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
    const { isAnimating, onYearTransitionEnd } = this.props;

    // For IE9, immediately call onYearTransitionEnd instead of
    // waiting for the animation to complete
    if (!this.isTransitionEndSupported && isAnimating) {
      onYearTransitionEnd();
    }
  }

  componentWillUnmount() {
    this.container.removeEventListener('transitionend', this.onTransitionEnd);
  }

  onTransitionEnd() {
    this.props.onYearTransitionEnd();
  }

  getThunkFromMoment(year) {
    return () => year;
  }

  render() {
    const {
      firstVisibleYearIndex,
      initialYear,
      isAnimating,
      numberOfYears,
      modifiers,
      yearFormat,
      orientation,
      transformValue,
      onMonthMouseEnter,
      onMonthMouseLeave,
      onMonthMouseDown,
      onMonthMouseUp,
      onMonthClick,
      onMonthTouchStart,
      onMonthTouchEnd,
      onMonthTouchTap,
      onYearTransitionEnd,
    } = this.props;

    let year = initialYear().clone().subtract(1, 'year');

    const years = [];
    for (let i = 0; i < numberOfYears + 2; i++) {
      const isVisible =
        (i >= firstVisibleYearIndex) && (i < firstVisibleYearIndex + numberOfYears);

      years.push(
        <CalendarYear
          key={year}
          year={this.getThunkFromMoment(year)}
          isVisible={isVisible}
          modifiers={modifiers}
          yearFormat={yearFormat}
          orientation={orientation}
          onMonthMouseEnter={onMonthMouseEnter}
          onMonthMouseLeave={onMonthMouseLeave}
          onMonthMouseDown={onMonthMouseDown}
          onMonthMouseUp={onMonthMouseUp}
          onMonthClick={onMonthClick}
          onMonthTouchStart={onMonthTouchStart}
          onMonthTouchEnd={onMonthTouchEnd}
          onMonthTouchTap={onMonthTouchTap}
        />
      );
      year = year.clone().add(1, 'year');
    }

    const className = cx('CalendarYearGrid', {
      'CalendarYearGrid--horizontal': orientation === HORIZONTAL_ORIENTATION,
      'CalendarYearGrid--vertical': orientation === VERTICAL_ORIENTATION,
      'CalendarYearGrid--animating': isAnimating,
    });

    return (
      <div
        ref={ref => { this.containerRef = ref; }}
        className={className}
        style={getTransformStyles(transformValue)}
        onTransitionEnd={onYearTransitionEnd}
      >
        {years}
      </div>
    );
  }
}

CalendarYearGrid.propTypes = propTypes;
CalendarYearGrid.defaultProps = defaultProps;
