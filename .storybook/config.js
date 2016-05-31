import { configure } from '@kadira/storybook';

configure(function () {
  require('./stories/areachart');
  require('./stories/barchart');
  require('./stories/linechart');
  require('./stories/scatterchart');
  require('./stories/piechart');
  require('./stories/treemap');
}, module);
