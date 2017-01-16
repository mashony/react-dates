import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import ReactDOM from 'react-dom';
import moment from 'moment';
import cx from 'classnames';

import OutsideClickHandler from './OutsideClickHandler';
import CalendarYearGrid from './CalendarYearGrid';
import PickerNavigation from './PickerNavigation';
import { applyTransformStyles, calculateDimension } from './DayPicker';

import OrientationShape from '../shapes/OrientationShape';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';

const CALENDAR_YEAR_WIDTH = 300;
const MONTH_PICKER_PADDING = 9;
const YEAR_PADDING = 23;
const PREV_TRANSITION = 'prev';
const NEXT_TRANSITION = 'next';

const propTypes = {
  numberOfYears: PropTypes.number,
  modifiers: PropTypes.object,
  orientation: OrientationShape,
  withPortal: PropTypes.bool,
  hidden: PropTypes.bool,
  initialVisibleYear: momentPropTypes.momentObj,

  navPrev: PropTypes.node,
  navNext: PropTypes.node,

  onMonthClick: PropTypes.func,
  onMonthMouseDown: PropTypes.func,
  onMonthMouseUp: PropTypes.func,
  onMonthMouseEnter: PropTypes.func,
  onMonthMouseLeave: PropTypes.func,
  onMonthTouchStart: PropTypes.func,
  onMonthTouchEnd: PropTypes.func,
  onMonthTouchTap: PropTypes.func,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onOutsideClick: PropTypes.func,

  // i18n
  yearFormat: PropTypes.string,
};

const defaultProps = {
  numberOfYears: 1,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hidden: false,

  initialVisibleYear: moment(),

  navPrev: null,
  navNext: null,

  onMonthClick() {},
  onMonthMouseDown() {},
  onMonthMouseUp() {},
  onMonthMouseEnter() {},
  onMonthMouseLeave() {},
  onMonthTouchStart() {},
  onMonthTouchTap() {},
  onMonthTouchEnd() {},
  onPrevClick() {},
  onNextClick() {},
  onOutsideClick() {},

  yearFormat: 'YYYY',
};

function getMonthHeight(el) {
  const caption = el.querySelector('.js-CalendarYear__caption');
  const grid = el.querySelector('.js-CalendarYear__grid');

  // Need to separate out table children for FF
  // Add an additional +1 for the border
  return (
    calculateDimension(caption, 'height', true, true) +
    calculateDimension(grid, 'height') + 1
  );
}


export default class MonthPicker extends React.Component {
  constructor(props) {
    super(props);

    this.hasSetInitialVisibleYear = !props.hidden;
    this.state = {
      currentYear: props.hidden ? moment() : props.initialVisibleYear,
      YearTransition: null,
      translationValue: 0,
    };

    this.onPrevClick = this.onPrevClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.updateStateAfterYearTransition = this.updateStateAfterYearTransition.bind(this);
  }

  componentDidMount() {
    if (this.isHorizontal()) {
      this.adjustMonthPickerHeight();
      this.initializeMonthPickerWidth();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.hidden) {
      if (!this.hasSetInitialVisibleYear) {
        this.hasSetInitialVisibleYear = true;
        this.setState({
          currentYear: nextProps.initialVisibleYear(),
        });
      }

      if (!this.monthPickerWidth && this.isHorizontal()) {
        this.initializeMonthPickerWidth();
        this.adjustMonthPickerHeight();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.YearTransition || !this.state.currentYear.isSame(prevState.currentYear)) {
      if (this.isHorizontal()) {
        this.adjustMonthPickerHeight();
      }
    }
  }

  onPrevClick(e) {
    if (e) e.preventDefault();

    if (this.props.onPrevClick) {
      this.props.onPrevClick(e);
    }

    const translationValue =
      this.isVertical() ? this.getMonthHeightByIndex(0) : this.monthPickerWidth;

    // The first CalendarYear is always positioned absolute at top: 0 or left: 0
    // so we need to transform it to the appropriate location before the animation.
    // This behavior is because we would otherwise need a double-render in order to
    // adjust the container position once we had the height the first calendar
    // (ie first draw all the calendar, then in a second render, use the first calendar's
    // height to position the container). Variable calendar heights, amirite? <3 Maja
    this.translateFirstYearPickerForAnimation(translationValue);

    this.setState({
      YearTransition: PREV_TRANSITION,
      translationValue,
    });
  }

  onNextClick(e) {
    if (e) e.preventDefault();
    if (this.props.onNextClick) {
      this.props.onNextClick(e);
    }

    const translationValue =
      this.isVertical() ? -this.getMonthHeightByIndex(1) : -this.monthPickerWidth;

    this.setState({
      YearTransition: NEXT_TRANSITION,
      translationValue,
    });
  }

  getMonthHeightByIndex(i) {
    return getMonthHeight(
      ReactDOM.findDOMNode(this.refs.transitionContainer).querySelectorAll('.CalendarYear')[i],
    );
  }

  isHorizontal() {
    return this.props.orientation === HORIZONTAL_ORIENTATION;
  }

  isVertical() {
    return this.props.orientation === VERTICAL_ORIENTATION;
  }

  initializeMonthPickerWidth() {
    this.monthPickerWidth = calculateDimension(
      ReactDOM.findDOMNode(this.refs.calendarYearGrid).querySelector('.CalendarYear'),
      'width',
      true,
    );
  }

  updateStateAfterYearTransition() {
    const { currentYear, YearTransition } = this.state;

    let newYear = currentYear;
    if (YearTransition === PREV_TRANSITION) {
      newYear = currentYear.clone().subtract(1, 'year');
    } else if (YearTransition === NEXT_TRANSITION) {
      newYear = currentYear.clone().add(1, 'year');
    }

    // clear the previous transforms
    applyTransformStyles(
      ReactDOM.findDOMNode(this.refs.calendarYearGrid).querySelector('.CalendarYear'),
      'none',
    );

    this.setState({
      currentYear: newYear,
      YearTransition: null,
      translationValue: 0,
    });
  }

  adjustMonthPickerHeight() {
    const transitionContainer = ReactDOM.findDOMNode(this.refs.transitionContainer);
    const heights = [];

    // convert node list to array
    [...transitionContainer.querySelectorAll('.CalendarYear')].forEach((el) => {
      if (el.getAttribute('data-visible') === 'true') {
        heights.push(getMonthHeight(el));
      }
    });

    const newYearHeight = Math.max(...heights) + YEAR_PADDING;

    if (newYearHeight !== calculateDimension(transitionContainer, 'height')) {
      this.yearHeight = newYearHeight;
      transitionContainer.style.height = `${newYearHeight}px`;
    }
  }

  translateFirstYearPickerForAnimation(translationValue) {
    const transformType = this.isVertical() ? 'translateY' : 'translateX';
    const transformValue = `${transformType}(-${translationValue}px)`;

    applyTransformStyles(
      ReactDOM.findDOMNode(this.refs.transitionContainer).querySelector('.CalendarYear'),
      transformValue,
      1,
    );
  }

  renderNavigation() {
    const {
      navPrev,
      navNext,
    } = this.props;

    return (
      <PickerNavigation
        onPrevClick={this.onPrevClick}
        onNextClick={this.onNextClick}
        navPrev={navPrev}
        navNext={navNext}
        isVertical={this.isVertical()}
      />
    );
  }

  render() {
    const { currentYear, YearTransition, translationValue } = this.state;
    const {
      numberOfYears,
      orientation,
      modifiers,
      withPortal,
      onMonthClick,
      onMonthMouseDown,
      onMonthMouseUp,
      onMonthTouchStart,
      onMonthTouchEnd,
      onMonthTouchTap,
      onMonthMouseEnter,
      onMonthMouseLeave,
      onOutsideClick,
      yearFormat,
    } = this.props;

    const monthPickerClassNames = cx('MonthPicker', {
      'MonthPicker--horizontal': this.isHorizontal(),
      'MonthPicker--vertical': this.isVertical(),
      'MonthPicker--portal': withPortal,
    });

    const transitionContainerClasses = cx('transition-container', {
      'transition-container--horizontal': this.isHorizontal(),
      'transition-container--vertical': this.isVertical(),
    });

    const horizontalWidth = (CALENDAR_YEAR_WIDTH * numberOfYears) + (2 * MONTH_PICKER_PADDING);

    // this is a kind of made-up value that generally looks good. we'll
    // probably want to let the user set this explicitly.
    const verticalHeight = 1.75 * CALENDAR_YEAR_WIDTH;

    const monthPickerStyle = {
      width: this.isHorizontal() && horizontalWidth,

      // These values are to center the datepicker (approximately) on the page
      marginLeft: this.isHorizontal() && withPortal && -horizontalWidth / 2,
      marginTop: this.isHorizontal() && withPortal && -CALENDAR_YEAR_WIDTH / 2,
    };

    const transitionContainerStyle = {
      width: this.isHorizontal() && horizontalWidth,
      height: this.isVertical() && !withPortal && verticalHeight,
    };

    const isCalendarYearGridAnimating = YearTransition !== null;
    const transformType = this.isVertical() ? 'translateY' : 'translateX';
    const transformValue = `${transformType}(${translationValue}px)`;

    return (
      <div className={monthPickerClassNames} style={monthPickerStyle} >
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          {this.renderNavigation()}
          <div
            className={transitionContainerClasses}
            ref="transitionContainer"
            style={transitionContainerStyle}
          >
            <CalendarYearGrid
              ref="calendarYearGrid"
              transformValue={transformValue}
              initialYear={() => currentYear}
              isAnimating={isCalendarYearGridAnimating}
              modifiers={modifiers}
              orientation={orientation}
              withPortal={withPortal}
              onMonthClick={onMonthClick}
              onMonthMouseDown={onMonthMouseDown}
              onMonthMouseUp={onMonthMouseUp}
              onMonthTouchStart={onMonthTouchStart}
              onMonthTouchEnd={onMonthTouchEnd}
              onMonthTouchTap={onMonthTouchTap}
              onMonthMouseEnter={onMonthMouseEnter}
              onMonthMouseLeave={onMonthMouseLeave}
              onYearTransitionEnd={this.updateStateAfterYearTransition}
              yearFormat={yearFormat}
            />
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}

MonthPicker.propTypes = propTypes;
MonthPicker.defaultProps = defaultProps;
