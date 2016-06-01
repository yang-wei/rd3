import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import centered from 'react-storybook-centered';
import { randomGroups } from './_utils';
import { Treemap } from '../../src/treemap/';

const stories = storiesOf('Treemap', module)
  .addDecorator(centered);

// ---

stories.add('defaults', function () {
  const props = {
    width: 500,
    height: 500,
    data: randomGroups(5),
  };
  return <Treemap {...props} />
});
