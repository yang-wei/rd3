'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');
const d3 = require('d3');
const AxisTicks = require('./AxisTicks');
const AxisLine = require('./AxisLine');
const Label = require('./Label');

module.exports = createReactClass({

  displayName: 'XAxis',

  propTypes: {
    fill: PropTypes.string,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    horizontalChart: PropTypes.bool,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.string,
    tickStroke: PropTypes.string,
    tickTextStroke: PropTypes.string,
    xAxisClassName: PropTypes.string,
    xAxisLabel: PropTypes.string,
    xAxisTickValues: PropTypes.array,
    xAxisOffset: PropTypes.number,
    xScale: PropTypes.func.isRequired,
    xOrient: PropTypes.oneOf(['top', 'bottom']),
    yOrient: PropTypes.oneOf(['left', 'right']),
    gridVertical: PropTypes.bool,
    gridVerticalStroke: PropTypes.string,
    gridVerticalStrokeWidth: PropTypes.number,
    gridVerticalStrokeDash: PropTypes.string,
  },

  getDefaultProps() {
    return {
      fill: 'none',
      stroke: 'none',
      strokeWidth: '1',
      tickStroke: '#000',
      xAxisClassName: 'rd3-x-axis',
      xAxisLabel: '',
      xAxisLabelOffset: 10,
      xAxisOffset: 0,
      xOrient: 'bottom',
      yOrient: 'left',
    };
  },

  render() {
    const props = this.props;

    const t = `translate(0 ,${props.xAxisOffset + props.height})`;

    let tickArguments;
    if (typeof props.xAxisTickCount !== 'undefined') {
      tickArguments = [props.xAxisTickCount];
    }

    if (typeof props.xAxisTickInterval !== 'undefined') {
      tickArguments = [d3.time[props.xAxisTickInterval.unit], props.xAxisTickInterval.interval];
    }

    return (
      <g
        className={props.xAxisClassName}
        transform={t}
      >
        <AxisTicks
          tickValues={props.xAxisTickValues}
          tickFormatting={props.tickFormatting}
          tickArguments={tickArguments}
          tickStroke={props.tickStroke}
          tickTextStroke={props.tickTextStroke}
          innerTickSize={props.tickSize}
          scale={props.xScale}
          orient={props.xOrient}
          orient2nd={props.yOrient}
          height={props.height}
          width={props.width}
          horizontalChart={props.horizontalChart}
          gridVertical={props.gridVertical}
          gridVerticalStroke={props.gridVerticalStroke}
          gridVerticalStrokeWidth={props.gridVerticalStrokeWidth}
          gridVerticalStrokeDash={props.gridVerticalStrokeDash}
        />
        <AxisLine
          scale={props.xScale}
          stroke={props.stroke}
          orient={props.xOrient}
          outerTickSize={props.tickSize}
          {...props}
        />
        <Label
          horizontalChart={props.horizontalChart}
          label={props.xAxisLabel}
          offset={props.xAxisLabelOffset}
          orient={props.xOrient}
          margins={props.margins}
          width={props.width}
        />
      </g>
    );
  },
});
