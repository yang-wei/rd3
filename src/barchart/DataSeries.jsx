'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const BarContainer = require('./BarContainer');

module.exports = createReactClass({

  displayName: 'DataSeries',

  propTypes: {
    _data: PropTypes.array,
    series: PropTypes.array,
    grouped: PropTypes.bool,
    colors: PropTypes.func,
    colorAccessor: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number,
    valuesAccessor: PropTypes.func,
    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
    y0Accessor: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
    hoverAnimation: PropTypes.any, // TODO: prop types?
    xScale: PropTypes.any,
    yScale: PropTypes.any,
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
