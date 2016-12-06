import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import centered from 'react-storybook-centered';
import { randomSeries, randomTimeseries } from './_utils';
import { LineChart } from '../../src/linechart/';

const stories = storiesOf('LineChart', module)
  .addDecorator(centered);

// ---

stories.add('defaults', function () {
  const props = {
    width: 600,
    height: 300,
    data: [
      {name: 'America', values: randomSeries(10, true)},
      {name: 'Africa', values: randomSeries(10, true)},
    ],
  };
  return <LineChart {...props} />
});

stories.add('stroke style', function () {
  const props = {
    width: 600,
    height: 300,
    data: [
      {name: 'America', values: randomSeries(10, true), strokeWidth: 3, strokeDashArray: '5,5'},
      {name: 'Africa', values: randomSeries(10, true)},
    ],
  };
  return <LineChart {...props} />
});

stories.add('timeseries', function () {
  const props = {
    width: 600,
    height: 300,
    data: [
      {name: 'America', values: randomTimeseries(10, true)},
      {name: 'Africa', values: randomTimeseries(10, true)},
    ],
    xAxisTickInterval: { unit: 'minute', interval: 2 },
  };
  return <LineChart {...props} />
});

stories.add('with legend', function () {
  const props = {
    width: 600,
    height: 300,
    legend: true,
    data: [
      {name: 'America', values: randomSeries(10, true)},
      {name: 'Africa', values: randomSeries(10, true)},
    ],
  };
  return <LineChart {...props} />
});
