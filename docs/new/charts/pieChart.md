# Pie Chart

## Example

<iframe width="100%" height="400" src="//jsfiddle.net/YangWei/8t16sp9g/1/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Props

Name | Type  | Default  | Description
--- | --- | ---- | ---
data | array | `[]` |
radius | number |  |
cx | number |  |
cy | number |  |
labelTextFill | string |  |
valueTextFill | string |  |
valueTextFormatter | func | `(val) => `${val}%`` |
colors | func | `d3.scale.category20c()` |
colorAccessor | func | `(d, idx) => idx` |
title | string | `''` |
showInnerLabels | bool |  |
showOuterLabels | bool |  |
sectorBorderColor | string |  |
hoverAnimation | bool | `true` |