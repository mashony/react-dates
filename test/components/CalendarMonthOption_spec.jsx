import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';
import moment from 'moment';

import CalendarMonthOption, { TOUCHSTART_TIMEOUT } from '../../src/components/CalendarMonthOption';

describe('CalendarMonthOption', () => {
  describe('#constructor', () => {
    it('sets this.hasActiveTouchStart to false initially', () => {
      const wrapperInstance = shallow(<CalendarMonthOption isOutsideDay />).instance();
      expect(wrapperInstance.hasActiveTouchStart).to.equal(false);
    });
  });

  describe('#render', () => {
    it('is .CalendarMonthOption class', () => {
      const wrapper = shallow(<CalendarMonthOption />);
      expect(wrapper.is('.CalendarMonthOption')).to.equal(true);
    });

    it('has .CalendarMonthOption__month class', () => {
      const wrapper = shallow(<CalendarMonthOption />);
      expect(wrapper.find('.CalendarMonthOption__month')).to.have.lengthOf(1);
    });

    it('contains formatted day for single digit days', () => {
      const firstOfMonth = () => moment().startOf('month');
      const wrapper = shallow(<CalendarMonthOption day={firstOfMonth} />);
      expect(wrapper.text()).to.equal(firstOfMonth().format('MMMM'));
    });

    it('contains formatted day for double digit days', () => {
      const lastOfMonth = () => moment().endOf('month');
      const wrapper = shallow(<CalendarMonthOption day={lastOfMonth} />);
      expect(wrapper.text()).to.equal(lastOfMonth().format('MMMM'));
    });
  });

  describe('#handleMonthClick', () => {
    let handleMonthClickSpy;
    beforeEach(() => {
      handleMonthClickSpy = sinon.spy(CalendarMonthOption.prototype, 'handleMonthClick');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by click', () => {
      const wrapper = shallow(<CalendarMonthOption />);
      wrapper.simulate('click');
      expect(handleMonthClickSpy).to.have.property('callCount', 1);
    });

    it('calls props.onMonthClick', () => {
      const onMonthClickStub = sinon.stub();
      const wrapper = shallow(<CalendarMonthOption onMonthClick={onMonthClickStub} />);
      wrapper.instance().handleMonthClick();
      expect(onMonthClickStub).to.have.property('callCount', 1);
    });
  });

  describe('#handleMonthMouseDown', () => {
    let handleMonthMouseDownSpy;
    beforeEach(() => {
      handleMonthMouseDownSpy = sinon.spy(CalendarMonthOption.prototype, 'handleMonthMouseDown');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mousedown', () => {
      const wrapper = shallow(<CalendarMonthOption />);
      wrapper.simulate('mousedown');
      expect(handleMonthMouseDownSpy).to.have.property('callCount', 1);
    });

    it('calls props.onMonthMouseDown', () => {
      const onMouseDownStub = sinon.stub();
      const wrapper = shallow(<CalendarMonthOption onMonthMouseDown={onMouseDownStub} />);
      wrapper.instance().handleMonthMouseDown();
      expect(onMouseDownStub).to.have.property('callCount', 1);
    });
  });

  describe('#handleMonthMouseUp', () => {
    let handleMonthMouseUpSpy;
    beforeEach(() => {
      handleMonthMouseUpSpy = sinon.spy(CalendarMonthOption.prototype, 'handleMonthMouseUp');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseup', () => {
      const wrapper = shallow(<CalendarMonthOption />);
      wrapper.simulate('mouseup');
      expect(handleMonthMouseUpSpy).to.have.property('callCount', 1);
    });

    it('calls props.onMonthMouseUp', () => {
      const onMouseUpStub = sinon.stub();
      const wrapper = shallow(<CalendarMonthOption onMonthMouseUp={onMouseUpStub} />);
      wrapper.instance().handleMonthMouseUp();
      expect(onMouseUpStub).to.have.property('callCount', 1);
    });
  });

  describe('#handleMonthMouseEnter', () => {
    let handleMonthMouseEnterSpy;
    beforeEach(() => {
      handleMonthMouseEnterSpy = sinon.spy(CalendarMonthOption.prototype, 'handleMonthMouseEnter');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseenter', () => {
      const wrapper = shallow(<CalendarMonthOption />);
      wrapper.simulate('mouseenter');
      expect(handleMonthMouseEnterSpy).to.have.property('callCount', 1);
    });

    it('calls props.onMonthMouseEnter', () => {
      const onMouseEnterStub = sinon.stub();
      const wrapper = shallow(<CalendarMonthOption onMonthMouseEnter={onMouseEnterStub} />);
      wrapper.instance().handleMonthMouseEnter();
      expect(onMouseEnterStub).to.have.property('callCount', 1);
    });
  });

  describe('#handleMonthMouseLeave', () => {
    let handleMonthMouseLeaveSpy;
    beforeEach(() => {
      handleMonthMouseLeaveSpy = sinon.spy(CalendarMonthOption.prototype, 'handleMonthMouseLeave');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseleave', () => {
      const wrapper = shallow(<CalendarMonthOption />);
      wrapper.simulate('mouseleave');
      expect(handleMonthMouseLeaveSpy).to.have.property('callCount', 1);
    });

    it('calls props.onMonthMouseLeave', () => {
      const onMouseLeaveStub = sinon.stub();
      const wrapper = shallow(<CalendarMonthOption onMonthMouseLeave={onMouseLeaveStub} />);
      wrapper.instance().handleMonthMouseLeave();
      expect(onMouseLeaveStub).to.have.property('callCount', 1);
    });
  });

  describe('#handleMonthTouchStart', () => {
    let handleMonthTouchStartSpy;
    let useFakeTimers;
    beforeEach(() => {
      handleMonthTouchStartSpy = sinon.spy(CalendarMonthOption.prototype, 'handleMonthTouchStart');
      useFakeTimers = sinon.useFakeTimers();
    });

    it('gets triggered by touchstart', () => {
      const wrapper = shallow(<CalendarMonthOption />);
      wrapper.simulate('touchstart');
      expect(handleMonthTouchStartSpy).to.have.property('callCount', 1);
    });

    it('sets this.hasActiveTouchStart to true', () => {
      const wrapperInstance = shallow(<CalendarMonthOption />).instance();
      wrapperInstance.handleMonthTouchStart();
      expect(wrapperInstance.hasActiveTouchStart).to.equal(true);
    });

    it('sets this.hasActiveTouchStart to false after TOUCHSTART_TIMEOUT ms have passed', () => {
      const wrapperInstance = shallow(<CalendarMonthOption />).instance();
      wrapperInstance.handleMonthTouchStart();
      expect(wrapperInstance.hasActiveTouchStart).to.equal(true);
      useFakeTimers.tick(TOUCHSTART_TIMEOUT);
      expect(wrapperInstance.hasActiveTouchStart).to.equal(false);
    });

    it('calls props.onMonthTouchStart', () => {
      const onMonthTouchStartStub = sinon.stub();
      const wrapper = shallow(<CalendarMonthOption onMonthTouchStart={onMonthTouchStartStub} />);
      wrapper.instance().handleMonthTouchStart();
      expect(onMonthTouchStartStub).to.have.property('callCount', 1);
    });

    afterEach(() => {
      sinon.restore();
      useFakeTimers.restore();
    });
  });

  describe('#handleMonthTouchEnd', () => {
    let handleMonthTouchEndSpy;
    let handleMonthTouchTapSpy;
    beforeEach(() => {
      handleMonthTouchEndSpy = sinon.spy(CalendarMonthOption.prototype, 'handleMonthTouchEnd');
      handleMonthTouchTapSpy = sinon.spy(CalendarMonthOption.prototype, 'handleMonthTouchTap');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by touchend', () => {
      const wrapper = shallow(<CalendarMonthOption />);
      wrapper.simulate('touchend');
      expect(handleMonthTouchEndSpy).to.have.property('callCount', 1);
    });

    it('calls handleMonthTouchTap if this.hasActiveTouchStart', () => {
      const wrapperInstance = shallow(<CalendarMonthOption />).instance();
      wrapperInstance.hasActiveTouchStart = true;
      wrapperInstance.handleMonthTouchEnd();
      expect(handleMonthTouchTapSpy).to.have.property('callCount', 1);
    });

    it('sets this.hasActiveTouchStart to false if this.hasActiveTouchStart', () => {
      const wrapperInstance = shallow(<CalendarMonthOption />).instance();
      wrapperInstance.hasActiveTouchStart = true;
      wrapperInstance.handleMonthTouchEnd();
      expect(wrapperInstance.hasActiveTouchStart).to.equal(false);
    });

    it('does not call handleMonthTouchTap if !this.hasActiveTouchStart', () => {
      const wrapperInstance = shallow(<CalendarMonthOption />).instance();
      wrapperInstance.hasActiveTouchStart = false;
      wrapperInstance.handleMonthTouchEnd();
      expect(handleMonthTouchTapSpy.called).to.equal(false);
    });

    it('calls props.onMonthTouchEnd', () => {
      const onMonthTouchEndStub = sinon.stub();
      const wrapper = shallow(<CalendarMonthOption onMonthTouchEnd={onMonthTouchEndStub} />);
      wrapper.instance().handleMonthTouchEnd();
      expect(onMonthTouchEndStub).to.have.property('callCount', 1);
    });
  });

  describe('#handleMonthTouchTap', () => {
    it('calls props.onMonthTouchTap', () => {
      const onMonthTouchTapStub = sinon.stub();
      const wrapper = shallow(<CalendarMonthOption onMonthTouchTap={onMonthTouchTapStub} />);
      wrapper.instance().handleMonthTouchTap();
      expect(onMonthTouchTapStub).to.have.property('callCount', 1);
    });
  });
});
