'use strict';

import { scaleOrdinal, schemeCategory20c } from 'd3-scale';
import React from 'react';

module.exports = React.createClass({

  displayName: 'BarChart',

  propTypes: {
    colors: React.PropTypes.func,
    data: React.PropTypes.array.isRequired,
    xScale: React.PropTypes.func.isRequired,
    xAccessor: React.PropTypes.func,
    yScale: React.PropTypes.func.isRequired,
    svgComponent: React.PropTypes.any,
    transform: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      colors: scaleOrdinal(schemeCategory20c),
      xAccessor: d => d.x,
      SvgComponent: (props) => <rect {...props} />,
      transform: 'translate(0 ,0)',
    };
  },

  _renderSeries(stackedData) {
    return stackedData.map(item => {
      const { key, index } = item
      const data = Array.from(item)
      return data.map(d => { 
        return this._renderItem(d, key, index)
      })
    });
  },

  _renderItem(item, key, index) {
    const { colors, xScale, yScale, SvgComponent, xAccessor } = this.props;
    const x = xScale(xAccessor(item['data']))
    const y = yScale(item[1]);
    const height = yScale(item[0]) - yScale(item[1]);
    const width = xScale.rangeBand()
    return (
      <SvgComponent
        x={x}
        y={y}
        height={height}
        width={width}
        fill={colors(index)}
      />
    );
  },

  render() {
    const props = this.props;
    return (
      <g transform={props.transform}>
        {this._renderSeries(props.data)}
      </g>
    );
  },
});