'use strict';

const React = require('react');
const BarContainer = require('./BarContainer');

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
    hoverAnimation: React.PropTypes.any, // TODO: prop types?
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
    const { colors, colorAccessor, hoverAnimation, xScale, yScale } = this.props;
    const barHeight = Math.abs(yScale(0) - yScale(segment.y));
    const y = yScale(segment.y0 + segment.y);
    return (
      <BarContainer
        height={barHeight}
        width={xScale.rangeBand()}
        x={xScale(segment.x)}
        y={(segment.y >= 0) ? y : y - barHeight}
        fill={colors(colorAccessor(segment, seriesIdx))}
        hoverAnimation={hoverAnimation}
        onMouseOver={this.props.onMouseOver}
        onMouseLeave={this.props.onMouseLeave}
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
