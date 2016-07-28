# Cartesian Chart Mixins

This mixin provides common properties for all Cartesian-style charts.

# Props

(All properties can be overridden by passing in the property to the top level call of any chart that implements the mixin.)

 Name | Type  | Default  | Description
--- | --- | ---- | ---
axesColor  | `string` | `'#000'` | fill color of axes
colors | `func` | [d3.scale.category20c()] | a hexadecimal color string. often implemented as one of [d3 ordinal color scales]
colorAccessor | `func` | `(d, idx) => idx` | **d** is the datum being operated on, and **idx** is the index in the array of datums |
data | `array` | `[]` |
height | `number` | 200 | height of chart
legend | `bool` | `false` | turn the legend on or off
legendOffset | `number` | 120 |
width | `number` | 400 | width of chart
xAccessor | `func` | `d => d.x` | to map values from data to x-axis
xAxisFormatter | `func` | | a string formatter for x-axis
xAxisLabel | `string` | `''` | x-axis label
xAxisLabelOffset | `number` | 38 | distance between x-axis and it's label
xAxisTickCount | `number` | |  number of ticks on x-axis
xAxisTickIntervel | `object` | |
xAxisTickValues | `array` | | values of x-axis
xAxisOffset | `number` | `0` |
xOrient | `oneOf(["top", "bottom"])` | `"bottom"` | x-axis location
xScale | `func` | | to map values from data to x-axis range
yAccessor | `func` | `d => d.y` | to map values from data to y-axis
yAxisFormatter | `func` | | a string formatter for the y-axis
yAxisLabel | `string` |  | y-axis label
yAxisLabelOffset | `number` | 35 | distance between y-axis and it's label
yAxisTickCount | `number` | | number of ticks on y-axis
yAxisTickIntervel | `object` | |
yAxisTickValues | `array` | `''` | values of y-axis
yAxisOffset | `number` | `0` |
yOrient | `oneOf(["default", "left", "right"])` | `"default"` | y-axis location
yScale | `func` | | to map values from data to y-axis range

[d3.scale.category20c()]: https://github.com/mbostock/d3/wiki/Ordinal-Scales#category20c
[d3 ordinal color scales]: https://github.com/mbostock/d3/wiki/Ordinal-Scales#categorical-colors
