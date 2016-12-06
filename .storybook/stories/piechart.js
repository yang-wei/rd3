import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import centered from 'react-storybook-centered';
import { randomGroups } from './_utils';
import { PieChart } from '../../src/piechart/';

const stories = storiesOf('PieChart', module)
  .addDecorator(centered);

// ---

stories.add('defaults', function () {
  const props = {
    width: 500,
    height: 500,
    radius: 150,
    data: randomGroups(5),
  };
  return <PieChart {...props} />
});

stories.add('doughnut', function () {
  const props = {
    width: 500,
    height: 500,
    radius: 150,
    innerRadius: 50,
    data: randomGroups(5),
  };
  return <PieChart {...props} />
});
