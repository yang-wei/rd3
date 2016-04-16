'use strict';

const React = require('react');
const { Chart, XAxis, YAxis, Tooltip } = require('../common');
const DataSeries = require('./DataSeries');
const utils = require('../utils');
const {
  CartesianChartPropsMixin,
  DefaultAccessorsMixin,
  ViewBoxMixin,
  TooltipMixin,
} = require('../mixins');

module.exports = React.createClass({

  displayName: 'ScatterChart',

  propTypes: {
    circleRadius: React.PropTypes.number,
    className: React.PropTypes.string,
    hoverAnimation: React.PropTypes.bool,
    margins: React.PropTypes.object,
    xAxisClassName: React.PropTypes.string,
    xAxisStrokeWidth: React.PropTypes.number,
    yAxisClassName: React.PropTypes.string,
    yAxisStrokeWidth: React.PropTypes.number,
  },

  mixins: [
    CartesianChartPropsMixin,
    DefaultAccessorsMixin,
    ViewBoxMixin,
    TooltipMixin,
  ],

  getDefaultProps() {
    return {
      circleRadius: 3,
      className: 'rd3-scatterchart',
      hoverAnimation: true,
      margins: { top: 10, right: 20, bottom: 50, left: 45 },
      xAxisClassName: 'rd3-scatterchart-xaxis',
      xAxisStrokeWidth: 1,
      yAxisClassName: 'rd3-scatterchart-yaxis',
      yAxisStrokeWidth: 1,
    };
  },

  _calculateScales: utils.calculateScales,

  render() {
    const props = this.props;
    const data = props.data;

    if (!data || data.length < 1) {
      return null;
    }

    const { innerWidth, innerHeight, trans, svgMargins } = this.getDimensions();
    const yOrient = this.getYOrient();
    const domain = props.domain || {};

    // Returns an object of flattened allValues, xValues, and yValues
    const flattenedData = utils.flattenData(data, props.xAccessor, props.yAccessor);

    const allValues = flattenedData.allValues;
    const xValues = flattenedData.xValues;
    const yValues = flattenedData.yValues;

    const scales = this._calculateScales(
      innerWidth, innerHeight, xValues, yValues, domain.x, domain.y
    );
    const xScale = scales.xScale;
    const yScale = scales.yScale;

    return (
      <span onMouseLeave={this.onMouseLeave}>
        <Chart
          colors={props.colors}
          colorAccessor={props.colorAccessor}
          data={data}
          height={props.height}
          legend={props.legend}
          sideOffset={props.sideOffset}
          margins={props.margins}
          title={props.title}
          viewBox={this.getViewBox()}
          width={props.width}
          shouldUpdate={!this.state.changeState}
        >
          <g
            className={props.className}
            transform={trans}
          >
            <XAxis
              data={data}
              height={innerHeight}
              horizontalChart={props.horizontal}
              margins={svgMargins}
              stroke={props.axesColor}
              strokeWidth={props.xAxisStrokeWidth.toString()}
              tickFormatting={props.xAxisFormatter}
              width={innerWidth}
              xAxisClassName={props.xAxisClassName}
              xAxisLabel={props.xAxisLabel}
              xAxisLabelOffset={props.xAxisLabelOffset}
              xAxisOffset={props.xAxisOffset}
              xAxisTickInterval={props.xAxisTickInterval}
              xAxisTickValues={props.xAxisTickValues}
              xOrient={props.xOrient}
              yOrient={yOrient}
              xScale={xScale}
              gridVertical={props.gridVertical}
              gridVerticalStroke={props.gridVerticalStroke}
              gridVerticalStrokeWidth={props.gridVerticalStrokeWidth}
              gridVerticalStrokeDash={props.gridVerticalStrokeDash}
            />
            <YAxis
              data={data}
              width={innerWidth}
              height={innerHeight}
              horizontalChart={props.horizontal}
              margins={svgMargins}
              stroke={props.axesColor}
              strokeWidth={props.yAxisStrokeWidth.toString()}
              tickFormatting={props.yAxisFormatter}
              yAxisClassName={props.yAxisClassName}
              yAxisLabel={props.yAxisLabel}
              yAxisLabelOffset={props.yAxisLabelOffset}
              yAxisOffset={props.yAxisOffset}
              yAxisTickValues={props.yAxisTickValues}
              yAxisTickCount={props.yAxisTickCount}
              yScale={yScale}
              xOrient={props.xOrient}
              yOrient={yOrient}
              gridHorizontal={props.gridHorizontal}
              gridHorizontalStroke={props.gridHorizontalStroke}
              gridHorizontalStrokeWidth={props.gridHorizontalStrokeWidth}
              gridHorizontalStrokeDash={props.gridHorizontalStrokeDash}
            />
            <DataSeries
              circleRadius={props.circleRadius}
              colors={props.colors}
              colorAccessor={props.colorAccessor}
              data={allValues}
              height={innerHeight}
              hoverAnimation={props.hoverAnimation}
              width={innerWidth}
              xAccessor={props.xAccessor}
              xScale={xScale}
              yAccessor={props.yAccessor}
              yScale={yScale}
              onMouseOver={this.onMouseOver}
            />
          </g>
        </Chart>
        {(props.showTooltip ? <Tooltip {...this.state.tooltip} /> : null)}
      </span>
    );
  },
});
