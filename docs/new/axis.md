# Axis
The components `XAxis` and `YAxis` are made of the components
* `AxisLine`: Line along the axis with small stroke at the end and begin
* `AxisTicks`: Ticks and grid lines
* `Label`: Text label of the axis

## `AxisTicks`
The component `AxisTicks` is used to display ticks and grid lines. Grid lines go from the same position as the ticks are drawn on the axis line and go to the other end of the chart. Grid lines can be used for all charts using the component `AxisTicks` (which are `AreaChart`, `BarChart`, `CandlestickChart`, `LineChart` and `ScatterChart`). Available properties of `AxisTicks`:

* **scale** - [https://github.com/mbostock/d3/wiki/Scales](https://github.com/mbostock/d3/wiki/Scales)
  * `React.PropTypes.func.isRequired`
* **orient** - Orientation of the ticks
  * `React.PropTypes.oneOf(['top','bottom','left','right']).isRequired`
* **orient2nd** - Orientation of the ticks of the other axis. This is required thereby on the position of the second axis no grid line is plotted.
  * `React.PropTypes.oneOf(['top','bottom','left','right'])`
* **height** - Hight of the drawing area of the chart which becomes the lenght of vertical grid lines.
  * `React.PropTypes.number.isRequired`
  * Calculated automatically in `XYChart.jsx`
* **width** - Width of the drawing area of the chart which becomes the lenght of horizontal grid lines.
  * `React.PropTypes.number.isRequired`
  * Calculated automatically in `XYChart.jsx`
* **tickArguments**
   * `React.PropTypes.array`
   * Default: `[10]`
* **tickValues**
  * `React.PropTypes.array`
   * Default: `null`
* **innerTickSize**
  * `React.PropTypes.number`
   * Default: `6`
* **outerTickSize**
  * `React.PropTypes.number`
   * Default: `6`
* **tickPadding**
  * `React.PropTypes.number`
   * Default: `3`
* **tickFormat**
  * `React.PropTypes.func`
* **tickStroke**
   * Default: `"#000"`
  * `React.PropTypes.string`
* **gridHorizontal** - Enable horizontal grid lines
  * `React.PropTypes.bool`
  * Default: `false`
* **gridVertical** - Enable vertical grid lines
  * `React.PropTypes.bool`
  * Default: `false`
* **gridHorizontalStroke** - Color of horizontal grid lines
  * `React.PropTypes.string`
  * Default: `"#D8D7D7"`
* **gridVerticalStroke** - Color of vertical grid lines
  * `React.PropTypes.string`
  * Default: `"#D8D7D7"`
* **gridHorizontalStrokeWidth** - Line with/thickness of horizontal grid lines
  * `React.PropTypes.number`
  * Default: `1`
* **gridVerticalStrokeWidth** - Line width/thickness of vertical grid lines
  * `React.PropTypes.number`
  * Default: `1`
* **gridHorizontalStrokeDash** - `stroke-dasharray` to control dashes and gaps of horizontal grid lines ([MDN Reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray))
  * `React.PropTypes.string`
  * Default: `"5, 5"`
* **gridVerticalStrokeDash** - `stroke-dasharray` to control dashes and gaps of vertical grid lines ([MDN Reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray))
  * `React.PropTypes.string`
  * Default: `"5, 5"`

Exampel to plot a line chart:

```javascript
<LineChart
  legend={true}
  data={lineData}
  width='100%'
  height={400}
  viewBoxObject={{
    x: 0,
    y: 0,
    width: 500,
    height: 400
  }}
  title="Line Chart"
  yAxisLabel="Altitude"
  xAxisLabel="Elapsed Time (sec)"
  gridHorizontal={true}
  gridVertical={true}
  gridHorizontalStroke={'#000'}
  gridVerticalStrokeDash={'1, 0'}
/>
```
