import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

export const TOUCHSTART_TIMEOUT = 200;

const propTypes = {
  month: momentPropTypes.momentObj,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  onMonthClick: PropTypes.func,
  onMonthMouseDown: PropTypes.func,
  onMonthMouseUp: PropTypes.func,
  onMonthMouseEnter: PropTypes.func,
  onMonthMouseLeave: PropTypes.func,
  onMonthTouchStart: PropTypes.func,
  onMonthTouchEnd: PropTypes.func,
  onMonthTouchTap: PropTypes.func,
};

const defaultProps = {
  month: moment(),
  modifiers: [],
  onMonthClick() {},
  onMonthMouseDown() {},
  onMonthMouseUp() {},
  onMonthMouseEnter() {},
  onMonthMouseLeave() {},
  onMonthTouchStart() {},
  onMonthTouchEnd() {},
  onMonthTouchTap() {},
};

export default class CalendarMonthOption extends React.Component {
  constructor(props) {
    super(props);
    this.hasActiveTouchStart = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleMonthClick(month, modifiers, e) {
    this.props.onMonthClick(month, modifiers, e);
  }

  handleMonthMouseDown(month, modifiers, e) {
    this.props.onMonthMouseDown(month, modifiers, e);
  }

  handleMonthMouseUp(month, modifiers, e) {
    this.props.onMonthMouseUp(month, modifiers, e);
  }

  handleMonthMouseEnter(month, modifiers, e) {
    this.props.onMonthMouseEnter(month, modifiers, e);
  }

  handleMonthMouseLeave(month, modifiers, e) {
    this.props.onMonthMouseLeave(month, modifiers, e);
  }

  handleMonthTouchStart(month, modifiers, e) {
    this.hasActiveTouchStart = true;
    setTimeout(() => {
      this.hasActiveTouchStart = false;
    }, TOUCHSTART_TIMEOUT);

    this.props.onMonthTouchStart(month, modifiers, e);
  }

  handleMonthTouchEnd(month, modifiers, e) {
    if (this.hasActiveTouchStart) {
      this.hasActiveTouchStart = false;
      this.handleMonthTouchTap(month, modifiers, e);
    }

    this.props.onMonthTouchEnd(month, modifiers, e);
  }

  handleMonthTouchTap(month, modifiers, e) {
    this.props.onMonthTouchTap(month, modifiers, e);
  }

  render() {
    const { month, modifiers } = this.props;

    return (
      <div
        className="CalendarMonthOption"
        onMouseEnter={(e) => this.handleMonthMouseEnter(month, modifiers, e)}
        onMouseLeave={(e) => this.handleMonthMouseLeave(month, modifiers, e)}
        onMouseDown={(e) => this.handleMonthMouseDown(month, modifiers, e)}
        onMouseUp={(e) => this.handleMonthMouseUp(month, modifiers, e)}
        onClick={(e) => this.handleMonthClick(month, modifiers, e)}
        onTouchStart={(e) => this.handleMonthTouchStart(month, modifiers, e)}
        onTouchEnd={(e) => this.handleMonthTouchEnd(month, modifiers, e)}
      >
        <span className="CalendarMonthOption__month">{month.format('MMMM')}</span>
      </div>
    );
  }
}

CalendarMonthOption.propTypes = propTypes;
CalendarMonthOption.defaultProps = defaultProps;
