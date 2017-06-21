import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import PickerNavigation from '../../src/components/PickerNavigation';
import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../../constants';

describe('PickerNavigation', () => {
  describe('#render', () => {
    it('.PickerNavigation class exists', () => {
      const wrapper = shallow(<PickerNavigation />);
      expect(wrapper.find('.PickerNavigation')).to.have.lengthOf(1);
    });

    it('has .PickerNavigation--horizontal when not vertical', () => {
      const wrapper = shallow(<PickerNavigation orientation={HORIZONTAL_ORIENTATION} />);
      expect(wrapper.find('.PickerNavigation--horizontal')).to.have.lengthOf(1);
    });

    it('has .PickerNavigation--vertical when vertical', () => {
      const wrapper = shallow(<PickerNavigation orientation={VERTICAL_ORIENTATION} />);
      expect(wrapper.find('.PickerNavigation--vertical')).to.have.lengthOf(1);
    });

    describe('prev month button', () => {
      it('has .PickerNavigation__prev class', () => {
        const wrapper = shallow(<PickerNavigation />);
        expect(wrapper.find('.PickerNavigation__prev')).to.have.lengthOf(1);
      });

      it('has .PickerNavigation__prev--rtl class', () => {
        const wrapper = shallow(<PickerNavigation isRTL />);
        expect(wrapper.find('.PickerNavigation__prev--rtl')).to.have.lengthOf(1);
      });

      it('has .PickerNavigation__prev on custom icon', () => {
        const wrapper = shallow(<PickerNavigation navPrev={<span>Prev</span>} />);
        expect(wrapper.find('.PickerNavigation__prev')).to.have.lengthOf(1);
      });

      it('has .PickerNavigation__prev--default if no custom prev icon', () => {
        const wrapper = shallow(<PickerNavigation />);
        expect(wrapper.find('.PickerNavigation__prev--default')).to.have.lengthOf(1);
      });

      it('has no .PickerNavigation__prev--default if custom prev icon', () => {
        const wrapper = shallow(<PickerNavigation navPrev={<span>Prev</span>} />);
        expect(wrapper.find('.PickerNavigation__prev--default')).to.have.lengthOf(0);
      });

      it('hidden when vertically scrollable', () => {
        const wrapper = shallow(<PickerNavigation orientation={VERTICAL_SCROLLABLE} />);
        expect(wrapper.find('.PickerNavigation__prev')).to.have.lengthOf(0);
      });
    });

    describe('next month button', () => {
      it('.PickerNavigation__next class exists', () => {
        const wrapper = shallow(<PickerNavigation />);
        expect(wrapper.find('.PickerNavigation__next')).to.have.lengthOf(1);
      });

      it('.PickerNavigation__next--rtl class exists', () => {
        const wrapper = shallow(<PickerNavigation isRTL />);
        expect(wrapper.find('.PickerNavigation__next--rtl')).to.have.lengthOf(1);
      });

      it('has .PickerNavigation__next class on custom icon', () => {
        const wrapper = shallow(<PickerNavigation navNext={<span>Next</span>} />);
        expect(wrapper.find('.PickerNavigation__next')).to.have.lengthOf(1);
      });

      it('has .PickerNavigation__next--default if no custom prev icon', () => {
        const wrapper = shallow(<PickerNavigation />);
        expect(wrapper.find('.PickerNavigation__next--default')).to.have.lengthOf(1);
      });

      it('has no .PickerNavigation__next--default if custom next icon', () => {
        const wrapper = shallow(<PickerNavigation navNext={<span>Next</span>} />);
        expect(wrapper.find('.PickerNavigation__next--default')).to.have.lengthOf(0);
      });
    });
  });

  describe('interactions', () => {
    it('is triggered by prev month button click', () => {
      const onPrevMonthStub = sinon.stub();
      const prevMonthButton = shallow(
        <PickerNavigation
          onPrevMonthClick={onPrevMonthStub}
        />,
      ).find('.PickerNavigation__prev');
      prevMonthButton.simulate('click');
      expect(onPrevMonthStub).to.have.property('callCount', 1);
    });
  });

  describe('interactions', () => {
    it('is triggered by next month button click', () => {
      const onNextMonthStub = sinon.stub();
      const nextMonthButton = shallow(
        <PickerNavigation
          onNextMonthClick={onNextMonthStub}
        />,
      ).find('.PickerNavigation__next');
      nextMonthButton.simulate('click');
      expect(onNextMonthStub).to.have.property('callCount', 1);
    });
  });
});
