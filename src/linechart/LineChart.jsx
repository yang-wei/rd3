'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const { Chart, XAxis, YAxis, Tooltip } = require('../common');
const DataSeries = require('./DataSeries');
const utils = require('../utils');
const {
  CartesianChartPropsMixin,
  DefaultAccessorsMixin,
  ViewBoxMixin,
  TooltipMixin,
} = require('../mixins');

module.exports = createReactClass({

  displayName: 'LineChart',

  propTypes: {
    circleRadius: PropTypes.number,
    hoverAnimation: PropTypes.bool,
    margins: PropTypes.object,
    data: PropTypes.array.isRequired,
  },

  mixins: [CartesianChartPropsMixin, DefaultAccessorsMixin, ViewBoxMixin, TooltipMixin],

  getDefaultProps() {
    return {
      circleRadius: 3,
      className: 'rd3-linechart',
      hoverAnimation: true,
      margins: { top: 10, right: 20, bottom: 50, left: 45 },
      xAxisClassName: 'rd3-linechart-xaxis',
      yAxisClassName: 'rd3-linechart-yaxis',
      data: [],
    };
  },

  _calculateScales: utils.calculateScales,

  render() {
    const props = this.props;

    if (this.props.data && this.props.data.length < 1) {
      return null;
    }

    const { innerWidth, innerHeight, trans, svgMargins } = this.getDimensions();
    const yOrient = this.getYOrient();
    const domain = props.domain || {};

    if (!Array.isArray(props.data)) {
      props.data = [props.data];
    }

    // Returns an object of flattened allValues, xValues, and yValues
    const flattenedData = utils.flattenData(props.data, props.xAccessor, props.yAccessor);

    const allValues = flattenedData.allValues;
    const xValues = flattenedData.xValues;
    const yValues = flattenedData.yValues;
    const scales = this._calculateScales(
      innerWidth,
      innerHeight,
      xValues,
      yValues,
      domain.x,
      domain.y
    );

    return (
      <span onMouseLeave={this.onMouseLeave}>
        <Chart
          viewBox={this.getViewBox()}
          legend={props.legend}
          sideOffset={props.sideOffset}
          data={props.data}
          margins={props.margins}
          colors={props.colors}
          colorAccessor={props.colorAccessor}
          width={props.width}
          height={props.height}
          title={props.title}
          shouldUpdate={!this.state.changeState}
        >
          <g transform={trans} className={props.className}>
            <XAxis
              xAxisClassName={props.xAxisClassName}
              strokeWidth={props.xAxisStrokeWidth}
              xAxisTickValues={props.xAxisTickValues}
              xAxisTickCount={props.xAxisTickCount}
              xAxisTickInterval={props.xAxisTickInterval}
              xAxisOffset={props.xAxisOffset}
              xScale={scales.xScale}
              xAxisLabel={props.xAxisLabel}
              xAxisLabelOffset={props.xAxisLabelOffset}
              tickFormatting={props.xAxisFormatter}
              tickStroke={props.xAxisTickStroke}
              tickTextStroke={props.xAxisTickTextStroke}
              xOrient={props.xOrient}
              yOrient={yOrient}
              data={props.data}
              margins={svgMargins}
              width={innerWidth}
              height={innerHeight}
              horizontalChart={props.horizontal}
              stroke={props.axesColor}
              gridVertical={props.gridVertical}
              gridVerticalStroke={props.gridVerticalStroke}
              gridVerticalStrokeWidth={props.gridVerticalStrokeWidth}
              gridVerticalStrokeDash={props.gridVerticalStrokeDash}
            />
            <YAxis
              yAxisClassName={props.yAxisClassName}
              strokeWidth={props.yAxisStrokeWidth}
              yScale={scales.yScale}
              yAxisTickValues={props.yAxisTickValues}
              yAxisTickCount={props.yAxisTickCount}
              yAxisOffset={props.yAxisOffset}
              yAxisLabel={props.yAxisLabel}
              yAxisLabelOffset={props.yAxisLabelOffset}
              tickFormatting={props.yAxisFormatter}
              tickStroke={props.yAxisTickStroke}
              tickTextStroke={props.yAxisTickTextStroke}
              xOrient={props.xOrient}
              yOrient={yOrient}
              margins={svgMargins}
              width={innerWidth}
              height={innerHeight}
              horizontalChart={props.horizontal}
              stroke={props.axesColor}
              gridHorizontal={props.gridHorizontal}
              gridHorizontalStroke={props.gridHorizontalStroke}
              gridHorizontalStrokeWidth={props.gridHorizontalStrokeWidth}
              gridHorizontalStrokeDash={props.gridHorizontalStrokeDash}
            />
            <DataSeries
              xScale={scales.xScale}
              yScale={scales.yScale}
              xAccessor={props.xAccessor}
              yAccessor={props.yAccessor}
              hoverAnimation={props.hoverAnimation}
              circleRadius={props.circleRadius}
              data={props.data}
              value={allValues}
              interpolationType={props.interpolationType}
              colors={props.colors}
              colorAccessor={props.colorAccessor}
              width={innerWidth}
              height={innerHeight}
              onMouseOver={this.onMouseOver}
            />
          </g>
        </Chart>
        {(props.showTooltip ? <Tooltip {...this.state.tooltip} /> : null)}
      </span>
    );
  },
});
