'use strict';

const React = require('react');
const BarContainer = require('../common/Container');

module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    _data: React.PropTypes.array,
    series: React.PropTypes.array,
    colors: React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    valuesAccessor: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    xScale: React.PropTypes.any,
    yScale: React.PropTypes.any,
  },

  _renderBarSeries() {
    const { _data, valuesAccessor } = this.props;
    return _data.map((layer, seriesIdx) => (
      valuesAccessor(layer).map(segment => this._renderBarContainer(segment, seriesIdx))
    ));
  },

  _renderBarContainer(segment, seriesIdx) {
    const { colors, colorAccessor, xScale, yScale } = this.props;
    const barHeight = Math.abs(yScale(0) - yScale(segment.y));
    const y = yScale(segment.y0 + segment.y);
    return (
      <BarContainer
        {...this.props}
        height={barHeight}
        width={xScale.rangeBand()}
        x={xScale(segment.x)}
        y={(segment.y >= 0) ? y : y - barHeight}
        fill={colors(colorAccessor(segment, seriesIdx))}
        dataPoint={{
          xValue: segment.x,
          yValue: segment.y,
          seriesName: this.props.series[seriesIdx],
        }}
      />
    );
  },

  render() {
    return (
      <g>{this._renderBarSeries()}</g>
    );
  },
});
