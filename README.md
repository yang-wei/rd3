## rd3 (forked from [react-d3](https://github.com/esbullington/react-d3))
Modular ReactJS charts made using d3 chart utilities. Work on project documentation has started [here](https://github.com/esbullington/react-d3/wiki). A few examples of the available charts can be seen below, the others can be [viewed here](https://reactiva.github.io/react-d3-website/), side-by-side with the React code that generates the charts.

[![npm version](https://badge.fury.io/js/rd3.svg)](https://badge.fury.io/js/rd3)

## Usage

### npmcdn
Thanks to [npmcdn](https://npmcdn.com/) you can now try out rd3 quickly:

 * https://npmcdn.com/rd3/build/public/js/react-d3.js
 * https://npmcdn.com/rd3/build/public/js/react-d3.min.js

### NPM
Or via `npm`:

```
npm install rd3
```

Then, import into your ReactJS project:

```
var rd3 = require('rd3');
// es6
import rd3 from 'rd3';
```

The charts are then available under the `rd3` namespace, which you can then use as shown on the [demonstration page](https://reactiva.github.io/react-d3-website/):

### Available Charts

```
var BarChart = rd3.BarChart;
var LineChart = rd3.LineChart;
var PieChart = rd3.PieChart;
var AreaChart = rd3.AreaChart;
var Treemap = rd3.Treemap;
var ScatterChart = rd3.ScatterChart;
var CandleStickChart = rd3.CandleStickChart;
```

For usage, please see [here](https://reactiva.github.io/react-d3-website/).  [API documentation](https://github.com/esbullington/react-d3/wiki/API) is also coming online over the coming days.

### Support

* Chat: [![Join the chat at https://gitter.im/esbullington/react-d3](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/esbullington/react-d3?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
* Issues: [react-d3 issues](https://github.com/esbullington/react-d3/issues) on Github
* Support: [react-d3 Google Groups email list](https://groups.google.com/forum/#!forum/react-d3)

### Background
Although there have been [several](http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/) [different](http://bl.ocks.org/milroc/d22bbf92231876505e5d) approaches proposed for combining the power of d3 with the flexibility and modularity of ReactJS, the approach I'm using here was inspired by [this blog post](http://10consulting.com/2014/02/19/d3-plus-reactjs-for-charting/) by Ben Smith of [Binary Consulting](http://10consulting.com/).

With this approach, React itself is responsible for generating the SVG markup.  d3.js is used for its tremendous collection of utility functions, such as those that calculate the `path` value for various chart types.

### License
MIT

Copyright (c) 2014-2015 Eric. S Bullington, Lim Yang Wei, and project [contributors](https://github.com/esbullington/react-d3/graphs/contributors)
