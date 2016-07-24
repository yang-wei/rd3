'use strict';

const React = require('react');
const d3 = require('d3');

module.exports = {

  propTypes: {
    axesColor: React.PropTypes.string,
    colors: React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    horizontal: React.PropTypes.bool,
    legend: React.PropTypes.bool,
    legendOffset: React.PropTypes.number,
    title: React.PropTypes.string,
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    xAccessor: React.PropTypes.func,
    xAxisFormatter: React.PropTypes.func,
    xAxisLabel: React.PropTypes.string,
    xAxisLabelOffset: React.PropTypes.number,
    xAxisTickCount: React.PropTypes.number,
    xAxisTickInterval: React.PropTypes.object,
    xAxisTickValues: React.PropTypes.array,
    xAxisTickStroke: React.PropTypes.string,
    xAxisTickTextStroke: React.PropTypes.string,
    xAxisOffset: React.PropTypes.number,
    xOrient: React.PropTypes.oneOf(['top', 'bottom']),
    xScale: React.PropTypes.func,
    yAccessor: React.PropTypes.func,
    yAxisFormatter: React.PropTypes.func,
    yAxisLabel: React.PropTypes.string,
    yAxisLabelOffset: React.PropTypes.number,
    yAxisTickCount: React.PropTypes.number,
    yAxisTickInterval: React.PropTypes.object,
    yAxisTickValues: React.PropTypes.array,
    yAxisTickStroke: React.PropTypes.string,
    yAxisTickTextStroke: React.PropTypes.string,
    yAxisOffset: React.PropTypes.number,
    yOrient: React.PropTypes.oneOf(['default', 'left', 'right']),
    yScale: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      axesColor: '#000',
      colors: d3.scale.category20c(),
      colorAccessor: (d, idx) => idx,
      height: 200,
      horizontal: false,
      legend: false,
      legendOffset: 120,
      title: '',
      width: 400,
      // xAxisFormatter: no predefined value right now
      xAxisLabel: '',
      xAxisLabelOffset: 38,
      xAxisOffset: 0,
      // xAxisTickCount: no predefined value right now
      // xAxisTickInterval: no predefined value right now
      // xAxisTickValues: no predefined value right now
      xAxisTickStroke: '#000',
      xAxisTickTextStroke: '#000',
      xOrient: 'bottom',
      // xScale: no predefined value right now
      // yAxisFormatter: no predefined value right now
      yAxisLabel: '',
      yAxisLabelOffset: 35,
      yAxisOffset: 0,
      // yAxisTickCount: no predefined value right now
      // yAxisTickInterval: no predefined value right now
      // yAxisTickValues: no predefined value right now
      yAxisTickStroke: '#000',
      yAxisTickTextStroke: '#000',
      yOrient: 'default',
      // yScale: no predefined value right now
    };
  },

  getYOrient() {
    const yOrient = this.props.yOrient;

    if (yOrient === 'default') {
      return this.props.horizontal ? 'right' : 'left';
    }

    return yOrient;
  },
};
