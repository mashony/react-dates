import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MonthPicker from '../src/components/MonthPicker';

import {
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../constants';

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

const TestCustomInfoPanel = () => (
  <div
    style={{
      padding: '10px 21px',
      borderTop: '1px solid #dce0e0',
      color: '#484848',
    }}
  >
    &#x2755; Some useful info here
  </div>
);

storiesOf('MonthPicker', module)
  .addWithInfo('default', () => (
    <MonthPicker />
  ))
  .addWithInfo('different initial year', () => (
    <MonthPicker />
  ))
  .addWithInfo('highlight actual month', () => (
    <MonthPicker />
  ))  
  .addWithInfo('with custom month size', () => (
    <MonthPicker monthSize={50} />
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
  .addWithInfo('vertically scrollable with 10 years', () => (
    <div
      style={{
        height: 568,
        width: 320,
      }}
    >
      <MonthPicker
        numberOfYears={10}
        orientation={VERTICAL_SCROLLABLE}
      />
    </div>
  ))
  .addWithInfo('vertical with custom month size', () => (
    <MonthPicker
      numberOfYears={2}
      orientation={VERTICAL_ORIENTATION}
      monthSize={50}
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
  ))
  .addWithInfo('with info panel', () => (
    <MonthPicker
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
    />
  ));
