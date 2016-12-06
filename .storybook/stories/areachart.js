import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import centered from 'react-storybook-centered';
import { randomSeries, randomTimeseries } from './_utils';
import { AreaChart } from '../../src/areachart/';

const stories = storiesOf('AreaChart', module)
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
  return <AreaChart {...props} />
});

stories.add('timeseries', function () {
  const props = {
    width: 600,
    height: 300,
    data: [
      {name: 'America', values: randomTimeseries(500, true)},
      {name: 'Africa', values: randomTimeseries(500, true)},
    ],
    xAxisTickInterval: { unit: 'hour', interval: 2 },
  };
  return <AreaChart {...props} />
});

stories.add('interpolate', function () {
  const props = {
    width: 600,
    height: 300,
    interpolate: true,
    data: [
      {name: 'America', values: randomSeries(10, true)},
      {name: 'Africa', values: randomSeries(10, true)},
    ],
  };
  return <AreaChart {...props} />
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
  return <AreaChart {...props} />
});
