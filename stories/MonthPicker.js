import React from 'react';
import { storiesOf } from '@kadira/storybook';
import moment from 'moment';
import MonthPicker from '../src/components/MonthPicker';

import { VERTICAL_ORIENTATION } from '../constants';

const TestPrevIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    Prev
  </span>
);

const TestNextIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    Next
  </span>
);

storiesOf('MonthPicker', module)
  .addWithInfo('default', () => (
    <MonthPicker />
  ))
  .addWithInfo('different initial year', () => (
    <MonthPicker initialVisibleYear={moment('1984')} />
  ))
  .addWithInfo('highlight actual month ', () => (
    <MonthPicker
      modifiers={{ selected: (month) =>
        month.startOf('month').isSame(moment().startOf('month')),
      }}
    />
  ))
  .addWithInfo('more than one year', () => (
    <MonthPicker numberOfYears={2} />
  ))
  .addWithInfo('vertical', () => (
    <MonthPicker
      numberOfYears={2}
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .addWithInfo('with custom arrows', () => (
    <MonthPicker
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .addWithInfo('vertical with fixed-width container', () => (
    <div style={{ width: '400px' }}>
      <MonthPicker
        numberOfYears={2}
        orientation={VERTICAL_ORIENTATION}
      />
    </div>
  ));
