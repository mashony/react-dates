import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import MonthPickerNavigation from '../../src/components/MonthPickerNavigation';

describe('MonthPickerNavigation', () => {
  describe('#render', () => {
    it('.MonthPickerNavigation class exists', () => {
      const wrapper = shallow(<MonthPickerNavigation />);
      expect(wrapper.find('.MonthPickerNavigation')).to.have.lengthOf(1);
    });

    it('has .MonthPickerNavigation--horizontal when not vertical', () => {
      const wrapper = shallow(<MonthPickerNavigation isVertical={false} />);
      expect(wrapper.find('.MonthPickerNavigation--horizontal')).to.have.lengthOf(1);
    });

    it('has .MonthPickerNavigation--vertical when vertical', () => {
      const wrapper = shallow(<MonthPickerNavigation isVertical />);
      expect(wrapper.find('.MonthPickerNavigation--vertical')).to.have.lengthOf(1);
    });

    describe('prev month button', () => {
      it('has .MonthPickerNavigation__prev class', () => {
        const wrapper = shallow(<MonthPickerNavigation />);
        expect(wrapper.find('.MonthPickerNavigation__prev')).to.have.lengthOf(1);
      });

      it('has .MonthPickerNavigation__prev on custom icon', () => {
        const wrapper = shallow(<MonthPickerNavigation navPrev={<span>Prev</span>} />);
        expect(wrapper.find('.MonthPickerNavigation__prev')).to.have.lengthOf(1);
      });

      it('has .MonthPickerNavigation__prev--default if no custom prev icon', () => {
        const wrapper = shallow(<MonthPickerNavigation />);
        expect(wrapper.find('.MonthPickerNavigation__prev--default')).to.have.lengthOf(1);
      });

      it('has no .MonthPickerNavigation__prev--default if custom prev icon', () => {
        const wrapper = shallow(<MonthPickerNavigation navPrev={<span>Prev</span>} />);
        expect(wrapper.find('.MonthPickerNavigation__prev--default')).to.have.lengthOf(0);
      });
    });

    describe('next month button', () => {
      it('.MonthPickerNavigation__next class exists', () => {
        const wrapper = shallow(<MonthPickerNavigation />);
        expect(wrapper.find('.MonthPickerNavigation__next')).to.have.lengthOf(1);
      });

      it('has .MonthPickerNavigation__next class on custom icon', () => {
        const wrapper = shallow(<MonthPickerNavigation navNext={<span>Next</span>} />);
        expect(wrapper.find('.MonthPickerNavigation__next')).to.have.lengthOf(1);
      });

      it('has .MonthPickerNavigation__next--default if no custom prev icon', () => {
        const wrapper = shallow(<MonthPickerNavigation />);
        expect(wrapper.find('.MonthPickerNavigation__next--default')).to.have.lengthOf(1);
      });

      it('has no .MonthPickerNavigation__next--default if custom next icon', () => {
        const wrapper = shallow(<MonthPickerNavigation navNext={<span>Next</span>} />);
        expect(wrapper.find('.MonthPickerNavigation__next--default')).to.have.lengthOf(0);
      });
    });
  });

  describe('interactions', () => {
    it('is triggered by prev month button click', () => {
      const onPrevYearStub = sinon.stub();
      const prevYearButton = shallow(
        <MonthPickerNavigation
          onPrevYearClick={onPrevYearStub}
        />
      ).find('.MonthPickerNavigation__prev');
      prevYearButton.simulate('click');
      expect(onPrevYearStub).to.have.property('callCount', 1);
    });
  });

  describe('interactions', () => {
    it('is triggered by next month button click', () => {
      const onNextYearStub = sinon.stub();
      const nextYearButton = shallow(
        <MonthPickerNavigation
          onNextYearClick={onNextYearStub}
        />
      ).find('.MonthPickerNavigation__next');
      nextYearButton.simulate('click');
      expect(onNextYearStub).to.have.property('callCount', 1);
    });
  });
});
