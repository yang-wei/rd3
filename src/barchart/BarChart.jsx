'use strict';

const React = require('react');
const d3 = require('d3');
const { Chart } = require('../common');

module.exports = React.createClass({

  displayName: 'BarChart',

  propTypes: {
    colors: React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    data: React.PropTypes.array.isRequired,
    margins: React.PropTypes.object,
    valuesAccessor: React.PropTypes.func,
    xScale: React.PropTypes.func,
    yScale: React.PropTypes.func,
    svgComponent: React.PropTypes.any,
  },

  getDefaultProps() {
    return {
      data: [],
      margins: { top: 10, right: 20, bottom: 40, left: 45 },
      valuesAccessor: d => d.values,
      colors: d3.scale.category20c(),
      colorAccessor: (d, idx) => idx,
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
        y={(segment.y >= 0) ? y : y - height}
        fill={colors(colorAccessor(segment, seriesIdx))}
      />
    );
  },

  render() {
    const props = this.props;
    return (
        <Chart
          margins={props.margins}
          colors={props.colors}
          colorAccessor={props.colorAccessor}
          width={props.width}
          height={props.height}
          title={props.title}
        >
          <g>{this._renderSeries(props.data, props.valuesAccessor)}</g>
        </Chart>
    );
  },
});