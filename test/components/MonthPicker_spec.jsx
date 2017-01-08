import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { mount, shallow } from 'enzyme';

import MonthPicker from '../../src/components/MonthPicker';
import CalendarYearGrid from '../../src/components/CalendarYearGrid';
import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';

describe('MonthPicker', () => {
  describe('#render', () => {
    describe('transitionContainer', () => {
      it('.transition-container class exists', () => {
        const wrapper = shallow(<MonthPicker />);
        expect(wrapper.find('.transition-container')).to.have.lengthOf(1);
      });

      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('.transition-container--horizontal class exists', () => {
          const wrapper = shallow(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          expect(wrapper.find('.transition-container--horizontal')).to.have.lengthOf(1);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('.transition-container--vertical class exists', () => {
          const wrapper = shallow(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
          expect(wrapper.find('.transition-container--vertical')).to.have.lengthOf(1);
        });
      });
    });

    describe('CalendarYearGrid', () => {
      it('component exists', () => {
        const wrapper = shallow(<MonthPicker />);
        expect(wrapper.find(CalendarYearGrid)).to.have.lengthOf(1);
      });

      describe('prop.isAnimating', () => {
        beforeEach(() => {
          sinon.stub(MonthPicker.prototype, 'adjustMonthPickerHeight');
          sinon.stub(MonthPicker.prototype, 'updateStateAfterYearTransition');
        });

        afterEach(() => {
          sinon.restore();
        });

        it('is true if state.YearTransition is truthy', () => {
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({ YearTransition: 'foo' });
          const CalendarYearGridComponent = wrapper.find(CalendarYearGrid);
          expect(CalendarYearGridComponent.prop('isAnimating')).to.equal(true);
        });

        it('is false if state.YearTransition is falsey', () => {
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({ YearTransition: null });
          const CalendarYearGridComponent = wrapper.find(CalendarYearGrid);
          expect(CalendarYearGridComponent.prop('isAnimating')).to.equal(false);
        });
      });
    });
  });

  describe('#isHorizontal', () => {
    it('returns true if props.orientation === HORIZONTAL_ORIENTATION', () => {
      const wrapper = shallow(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
      expect(wrapper.instance().isHorizontal()).to.equal(true);
    });

    it('returns false if props.orientation === VERTICAL_ORIENTATION', () => {
      const wrapper = shallow(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
      expect(wrapper.instance().isHorizontal()).to.equal(false);
    });
  });

  describe('#isVertical', () => {
    it('returns true if props.orientation === VERTICAL_ORIENTATION', () => {
      const wrapper = shallow(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
      expect(wrapper.instance().isVertical()).to.equal(true);
    });

    it('returns false if props.orientation === HORIZONTAL_ORIENTATION', () => {
      const wrapper = shallow(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
      expect(wrapper.instance().isVertical()).to.equal(false);
    });
  });

  describe('#onPrevYearClick', () => {
    let translateFirstMonthPickerForAnimationSpy;
    beforeEach(() => {
      translateFirstMonthPickerForAnimationSpy =
        sinon.stub(MonthPicker.prototype, 'translateFirstYearPickerForAnimation');
      sinon.stub(MonthPicker.prototype, 'adjustMonthPickerHeight');
      sinon.stub(MonthPicker.prototype, 'updateStateAfterYearTransition');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('calls props.onPrevYearClick', () => {
      const onPrevYearClickSpy = sinon.stub();
      const wrapper = shallow(<MonthPicker onPrevYearClick={onPrevYearClickSpy} />);
      wrapper.instance().onPrevYearClick();
      expect(onPrevYearClickSpy).to.have.property('callCount', 1);
    });

    it('calls translateFirstMonthPickerForAnimation', () => {
      const wrapper = shallow(<MonthPicker />);
      wrapper.instance().onPrevYearClick();
      expect(translateFirstMonthPickerForAnimationSpy).to.have.property('callCount', 1);
    });

    it('sets state.YearTransition to "prev"', () => {
      const wrapper = shallow(<MonthPicker />);
      wrapper.instance().onPrevYearClick();
      expect(wrapper.state().YearTransition).to.equal('prev');
    });
  });

  describe('#onNextYearClick', () => {
    beforeEach(() => {
      sinon.stub(MonthPicker.prototype, 'adjustMonthPickerHeight');
      sinon.stub(MonthPicker.prototype, 'updateStateAfterYearTransition');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('calls props.onNextYearClick', () => {
      const onNextYearClickSpy = sinon.stub();
      const wrapper = shallow(<MonthPicker onNextYearClick={onNextYearClickSpy} />);
      wrapper.instance().onNextYearClick();
      expect(onNextYearClickSpy).to.have.property('callCount', 1);
    });

    it('sets state.YearTransition to "next"', () => {
      const wrapper = shallow(<MonthPicker />);
      wrapper.instance().onNextYearClick();
      expect(wrapper.state().YearTransition).to.equal('next');
    });
  });

  describe.skip('life cycle methods', () => {
    let adjustMonthPickerHeightSpy;
    let initializeMonthPickerWidthSpy;
    beforeEach(() => {
      adjustMonthPickerHeightSpy = sinon.stub(MonthPicker.prototype, 'adjustMonthPickerHeight');
      initializeMonthPickerWidthSpy =
        sinon.stub(MonthPicker.prototype, 'initializeMonthPickerWidth');
    });

    afterEach(() => {
      sinon.restore();
    });

    describe('#componentDidMount', () => {
      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('calls adjustMonthPickerHeight', () => {
          mount(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          expect(adjustMonthPickerHeightSpy).to.have.property('callCount', 1);
        });

        it('calls initializeMonthPickerWidth', () => {
          mount(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          expect(initializeMonthPickerWidthSpy).to.have.property('callCount', 1);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('does not call adjustMonthPickerHeight', () => {
          mount(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
          expect(adjustMonthPickerHeightSpy.called).to.equal(false);
        });

        it('does not call initializeMonthPickerWidth', () => {
          mount(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
          expect(initializeMonthPickerWidthSpy.called).to.equal(false);
        });
      });
    });

    describe('#componentDidUpdate', () => {
      let updateStateAfterYearTransitionSpy;
      beforeEach(() => {
        updateStateAfterYearTransitionSpy = sinon.stub(
          MonthPicker.prototype,
          'updateStateAfterYearTransition'
        );
      });

      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('calls adjustMonthPickerHeight if state.YearTransition is truthy', () => {
          const wrapper = mount(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            YearTransition: 'foo',
          });
          expect(adjustMonthPickerHeightSpy).to.have.property('callCount', 2);
        });

        it('does not call adjustMonthPickerHeight if state.YearTransition is falsey', () => {
          const wrapper = mount(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            YearTransition: null,
          });
          expect(adjustMonthPickerHeightSpy.calledTwice).to.equal(false);
        });

        it('calls updateStateAfterYearTransition if state.YearTransition is truthy', () => {
          const wrapper = mount(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            YearTransition: 'foo',
          });
          expect(updateStateAfterYearTransitionSpy).to.have.property('callCount', 1);
        });

        it('does not call updateStateAfterYearTransition if state.YearTransition is falsey',
          () => {
            const wrapper = mount(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
            wrapper.setState({
              YearTransition: null,
            });
            expect(updateStateAfterYearTransitionSpy.calledOnce).to.equal(false);
          }
        );
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('does not call adjustMonthPickerHeight if state.YearTransition is truthy', () => {
          const wrapper = mount(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            YearTransition: 'foo',
          });
          expect(adjustMonthPickerHeightSpy.called).to.equal(false);
        });

        it('does not call adjustMonthPickerHeight if state.YearTransition is falsey', () => {
          const wrapper = mount(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            YearTransition: null,
          });
          expect(adjustMonthPickerHeightSpy.called).to.equal(false);
        });

        it('calls updateStateAfterYearTransition if state.YearTransition is truthy', () => {
          const wrapper = mount(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            YearTransition: 'foo',
          });
          expect(updateStateAfterYearTransitionSpy).to.have.property('callCount', 1);
        });

        it('does not call updateStateAfterYearTransition if state.YearTransition is falsey',
          () => {
            const wrapper = mount(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
            wrapper.setState({
              YearTransition: null,
            });
            expect(updateStateAfterYearTransitionSpy.calledOnce).to.equal(false);
          }
        );
      });
    });
  });
});
