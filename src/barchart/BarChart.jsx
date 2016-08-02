'use strict';

import d3 from 'd3';
import React from 'react';
import BasicChart from '../common/charts/BasicChart';

module.exports = React.createClass({

  displayName: 'BarChart',

  propTypes: {
    colors: React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    data: React.PropTypes.array.isRequired,
    valuesAccessor: React.PropTypes.func,
    xScale: React.PropTypes.func,
    yScale: React.PropTypes.func,
    svgComponent: React.PropTypes.any,
  },

  getDefaultProps() {
    return {
      data: [],
      valuesAccessor: d => d.values,
      colors: d3.scale.category20c(),
      SvgComponent: (props) => <rect {...props} />
    };
  },

  _renderSeries(stackedData, valuesAccessor) {
    return stackedData.map((layer, seriesIdx) => (
      valuesAccessor(layer).map(segment => this._renderBar(segment, seriesIdx))
    ));
  },

  _renderBar(segment, seriesIdx) {
    const { colors, colorAccessor, xScale, yScale, SvgComponent } = this.props;
    const height = Math.abs(yScale(0) - yScale(segment.y));
    const width = xScale.rangeBand()
    const x = xScale(segment.x)
    const y = (segment.y >= 0) ? yScale(segment.y0 + segment.y) : yScale(segment.y0 + segment.y) - height;
    return (
      <SvgComponent
        height={height}
        width={width}
        x={x}
        y={y}
        fill={colors(seriesIdx)}
      />
    );
  },

  render() {
    const props = this.props;
    return (
        <BasicChart
          width={props.width}
          height={props.height}
        >
          <g>{this._renderSeries(props.data, props.valuesAccessor)}</g>
        </BasicChart>
    );
  },
});