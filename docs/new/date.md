Currently, dates are supported in the multiseries charts, including `LineChart`, `ScatterChart`, `AreaChart`.  You can pass date objects in directly, or use an accessor to create a date from a UNIX date number.  You should make sure to also include an `xAxisTickInterval` or `yAxisTickInterval` indicating the time unit and interval:

```js
var LineChart = require('react-d3').LineChart;

var data = {
  'series 1': [ 
    { x: 1423915030039, y: 11.2 },
    { x: 1423913330040, y: 2.1 }
  ]
};

<LineChart
  data={data}
  xAccessor={(d)=> {
      return new Date(d.x);
    }     
  }
  yAccessor={(d)=>d.y}
  xAxisTickInterval={{unit: 'year', interval: 2}}
/>
```

or use d3's `d3.time.format` to parse string dates:

```js
var data = {
  'series 1': [ 
    { x: '2014-07-10', y: 1.2 },
    { x: '2014-10-15', y: 22.1 }
  ]
}

<LineChart
  data={data}
  xAccessor={(d)=> {
      var formatter = d3.time.format("%Y-%m-%d").parse;
      return formatter(d.x);
    }     
  }
  yAccessor={(d)=>d.y}
  xAxisTickInterval={{unit: 'year', interval: 2}}
/>
```
