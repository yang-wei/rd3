# CandleStick Chart

## Example

Coming Soon

## Props

* [**Cartesian Chart Props Mixin**](../cartesianChartPropsMixin)

Name | Type  | Default  | Description
--- | --- | ---- | ---
data | array,object | `[]` |
fillUp | func | `() => '#ffffff'` |
fillUpAccessor | func | `(d, idx) => idx` |
fillDown | func | `d3.scale.category20c()` |
fillDownAccessor | func | `(d, idx) => idx` |
hoverAnimation | bool | `true` |
xAxisFormatter | func |  |
xAxisTickInterval | object |  |
xAxisTickValues | array |  |
yAxisFormatter | func |  |
yAxisTickCount | number |  |
yAxisTickValues | array |  |
className |  | `'rd3-candlestick'` |
xAxisClassName |  | `'rd3-candlestick-xaxis'` |
yAxisClassName |  | `'rd3-candlestick-yaxis'` |
margins |  | `{ top: 10, right: 20, bottom: 30, left: 45 }` |
xAccessor |  | `(d) => d.x` |
yAccessor |  | `(d) => ({ open: d.open, high: d.high, low: d.low, close: d.close })` |