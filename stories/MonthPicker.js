import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MonthPicker from '../src/components/MonthPicker';

import { VERTICAL_ORIENTATION } from '../constants';

const TestPrevIcon = props => (
  <span style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px'
    }}
  >
    Prev
  </span>
);
const TestNextIcon = props => (
  <span style={{
    border: '1px solid #dce0e0',
    backgroundColor: '#fff',
    color: '#484848',
    padding: '3px'
    }}
  >
    Next
  </span>
);

storiesOf('MonthPicker', module)
  .addWithInfo('default', () => (
    <MonthPicker />
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
