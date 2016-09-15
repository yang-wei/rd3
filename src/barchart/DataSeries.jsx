'use strict';

const React = require('react');
const BarContainer = require('./BarContainer');

module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    _data: React.PropTypes.array,
    series: React.PropTypes.array,
    grouped: React.PropTypes.bool,
    colors: React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    valuesAccessor: React.PropTypes.func,
    xAccessor: React.PropTypes.func,
    yAccessor: React.PropTypes.func,
    y0Accessor: React.PropTypes.func,
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
    const { colors, colorAccessor, grouped, hoverAnimation, series, xScale, yScale } = this.props;
    const barHeight = Math.abs(yScale(0) - yScale(this.props.yAccessor(segment)));
    const yWidth = yScale(this.props.y0Accessor(segment) + this.props.yAccessor(segment));
    const y = grouped ? yScale(this.props.yAccessor(segment)) : yWidth;
    return (
      <BarContainer
        height={barHeight}
        width={grouped ? xScale.rangeBand() / series.length : xScale.rangeBand() }
        x={grouped ?
          xScale(this.props.xAccessor(segment)) + xScale.rangeBand() / series.length * seriesIdx :
          xScale(this.props.xAccessor(segment))
        }
        y={(this.props.yAccessor(segment) >= 0) ? y : y - barHeight}
        fill={colors(colorAccessor(segment, seriesIdx))}
        hoverAnimation={hoverAnimation}
        onMouseOver={this.props.onMouseOver}
        onMouseLeave={this.props.onMouseLeave}
        dataPoint={{
          xValue: this.props.xAccessor(segment),
          yValue: this.props.yAccessor(segment),
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
