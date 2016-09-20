# Bar Chart

Starting from v0.3.2, we made Bar Chart into a multi-series chart (a stacked chart). So you can pass in props that is supported by [Cartesian Chart](https://github.com/esbullington/react-d3/wiki/CartesianChartPropsMixin) as well. So it supports prop like legend(bool). It also support external y0 accessor for stacked data. Default stays d => d.y0 (as with d3.layout.stack()) but using a custom one is possible.

*However if you want to achieve single-series chart for now, you can pass in a single series data. We're very sorry the inconvenience but a more high level API will be supported in the future to let you disable stacked chart.*

## Example

<iframe width="100%" height="400" src="//jsfiddle.net/YangWei/8t16sp9g/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Props

* [**Cartesian Chart Props Mixin**](../cartesianChartPropsMixin)

Name | Type  | Default  | Description
--- | --- | ---- | ---
chartClassName | string | `'rd3-barchart'` |
data | array |  |
hoverAnimation | bool | `true` |
height | number |  |
margins | object | `{ top: 10, right: 20, bottom: 40, left: 45 }` |
rangeRoundBandsPadding | number | `0.25` |
stackOffset | 'silhouette',<br />'expand',<br />'wigget',<br />'zero' | `'zero'` |
valuesAccessor | func | `d => d.values` |
title | string |  |
width | number |  |
xAxisClassName | string | `'rd3-barchart-xaxis'` |
yAxisClassName | string | `'rd3-barchart-yaxis'` |
yAxisTickCount | number | `4` |
xAccessor | func | `d => d.x` |
yAccessor | func | `d => d.y` |
y0Accessor | func | `d => d.y0` |
grouped | bool | `false` | `grouped bar chart`
