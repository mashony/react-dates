import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import CalendarYear from '../../src/components/CalendarYear';
import CalendarYearGrid from '../../src/components/CalendarYearGrid';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';

import getTransformStyles from '../../src/utils/getTransformStyles';

describe('CalendarYearGrid', () => {
  it('is .CalendarYearGrid class', () => {
    const wrapper = shallow(<CalendarYearGrid />);
    expect(wrapper.is('.CalendarYearGrid')).to.equal(true);
  });

  it('is .CalendarYearGrid--horizontal class if props.orientation === HORIZONTAL_ORIENTATION',
    () => {
      const wrapper = shallow(<CalendarYearGrid orientation={HORIZONTAL_ORIENTATION} />);
      expect(wrapper.is('.CalendarYearGrid--horizontal')).to.equal(true);
    });

  it('is .CalendarYearGrid--vertical class if props.orientation === VERTICAL_ORIENTATION',
    () => {
      const wrapper = shallow(<CalendarYearGrid orientation={VERTICAL_ORIENTATION} />);
      expect(wrapper.is('.CalendarYearGrid--vertical')).to.equal(true);
    });

  it('is .CalendarYearGrid--animating class if props.isAnimating === true', () => {
    const wrapper = shallow(<CalendarYearGrid isAnimating />);
    expect(wrapper.is('.CalendarYearGrid--animating')).to.equal(true);
  });

  it('is not .CalendarYearGrid--animating class if props.isAnimating === false', () => {
    const wrapper = shallow(<CalendarYearGrid isAnimating={false} />);
    expect(wrapper.is('.CalendarYearGrid--animating')).to.equal(false);
  });

  it('the number of CalendarYears rendered matches props.numberOfYears + 2', () => {
    const NUM_OF_YEARS = 5;
    const wrapper = shallow(<CalendarYearGrid numberOfYears={NUM_OF_YEARS} />);
    expect(wrapper.find(CalendarYear)).to.have.lengthOf(NUM_OF_YEARS + 2);
  });

  it('has style equal to getTransformStyles(foo)', () => {
    const transformValue = 'foo';
    const transformStyles = getTransformStyles(transformValue);
    const wrapper = shallow(<CalendarYearGrid transformValue={transformValue} />);
    Object.keys(transformStyles).forEach((key) => {
      expect(wrapper.prop('style')[key]).to.equal(transformStyles[key]);
    });
  });
});
