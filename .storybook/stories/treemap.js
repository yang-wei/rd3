import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { randomGroups, centeredStory } from './_utils';
import { Treemap } from '../../src/treemap/';

const stories = storiesOf('Treemap', module)
  .addDecorator(centeredStory);

// ---

stories.add('defaults', function () {
  const props = {
    width: 500,
    height: 500,
    data: randomGroups(5),
  };
  return <Treemap {...props} />
});
