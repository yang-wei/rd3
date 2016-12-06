import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import centered from 'react-storybook-centered';
import { randomSeries, randomTimeseries } from './_utils';
import { ScatterChart } from '../../src/scatterchart/';

const stories = storiesOf('ScatterChart', module)
  .addDecorator(centered);

// ---

stories.add('defaults', function () {
  const props = {
    width: 600,
    height: 300,
    data: [
      {name: 'America', values: randomSeries(100, true)},
      {name: 'Africa', values: randomSeries(100, true)},
    ],
  };
  return <ScatterChart {...props} />
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
  return <ScatterChart {...props} />
});

stories.add('with legend', function () {
  const props = {
    width: 600,
    height: 300,
    legend: true,
    data: [
      {name: 'America', values: randomSeries(100, true)},
      {name: 'Africa', values: randomSeries(100, true)},
    ],
  };
  return <ScatterChart {...props} />
});
