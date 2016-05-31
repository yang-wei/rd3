import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { randomSeries, centeredStory } from './_utils';
import { BarChart } from '../../src/barchart/';

const stories = storiesOf('BarChart', module)
  .addDecorator(centeredStory);

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
  return <BarChart {...props} />
});

stories.add('offset:silhouette', function () {
  const props = {
    width: 600,
    height: 300,
    stackOffset: 'silhouette',
    data: [
      {name: 'America', values: randomSeries(10, true)},
      {name: 'Africa', values: randomSeries(10, true)},
    ],
  };
  return <BarChart {...props} />
});

stories.add('offset:expand', function () {
  const props = {
    width: 600,
    height: 300,
    stackOffset: 'expand',
    data: [
      {name: 'America', values: randomSeries(10, true)},
      {name: 'Africa', values: randomSeries(10, true)},
    ],
  };
  return <BarChart {...props} />
});

stories.add('offset:wigget', function () {
  const props = {
    width: 600,
    height: 300,
    stackOffset: 'wigget',
    data: [
      {name: 'America', values: randomSeries(10, true)},
      {name: 'Africa', values: randomSeries(10, true)},
    ],
  };
  return <BarChart {...props} />
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
  return <BarChart {...props} />
});
