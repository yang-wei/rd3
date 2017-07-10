'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const d3 = require('d3');
const utils = require('../utils');
const DataSeries = require('./DataSeries');
const { Chart, XAxis, YAxis } = require('../common');
const { ViewBoxMixin, CartesianChartPropsMixin } = require('../mixins');

module.exports = createReactClass({

  displayName: 'CandleStickChart',

  propTypes: {
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    fillUp: PropTypes.func,
    fillUpAccessor: PropTypes.func,
    fillDown: PropTypes.func,
    fillDownAccessor: PropTypes.func,
    hoverAnimation: PropTypes.bool,
    xAxisFormatter: PropTypes.func,
    xAxisTickInterval: PropTypes.object,
    xAxisTickValues: PropTypes.array,
    yAxisFormatter: PropTypes.func,
    yAxisTickCount: PropTypes.number,
    yAxisTickValues: PropTypes.array,
  },

  mixins: [CartesianChartPropsMixin, ViewBoxMixin],

  getDefaultProps() {
    return {
      className: 'rd3-candlestick',
      xAxisClassName: 'rd3-candlestick-xaxis',
      yAxisClassName: 'rd3-candlestick-yaxis',
      data: [],
      fillUp: () => '#ffffff',
      fillUpAccessor: (d, idx) => idx,
      fillDown: d3.scale.category20c(),
      fillDownAccessor: (d, idx) => idx,
      hoverAnimation: true,
      margins: { top: 10, right: 20, bottom: 30, left: 45 },
      xAccessor: (d) => d.x,
      yAccessor: (d) => ({ open: d.open, high: d.high, low: d.low, close: d.close }),
    };
  },

  render() {
    const props = this.props;

    const { innerWidth, innerHeight, trans, svgMargins } = this.getDimensions();
    const yOrient = this.getYOrient();
    const domain = props.domain || {};

    if (!Array.isArray(props.data)) {
      props.data = [props.data];
    }
    if (this.props.data && this.props.data.length < 1) {
      return null;
    }
    const flattenedData = utils.flattenData(props.data, props.xAccessor, props.yAccessor);

    const xValues = flattenedData.xValues;
    const yValues = flattenedData.yValues;
    const scales = utils.calculateScales(
      innerWidth, innerHeight, xValues, yValues, domain.x, domain.y);

    const dataSeries = props.data.map((series, idx) => (
        <DataSeries
          key={idx}
          seriesName={series.name}
          index={idx}
          xScale={scales.xScale}
          yScale={scales.yScale}
          data={series.values}
          fillUp={props.fillUp(props.fillUpAccessor(series, idx))}
          fillDown={props.fillDown(props.fillDownAccessor(series, idx))}
          xAccessor={props.xAccessor}
          yAccessor={props.yAccessor}
          hoverAnimation={props.hoverAnimation}
        />
      )
    );

    return (
      <Chart
        viewBox={this.getViewBox()}
        width={props.width}
        height={props.height}
        margins={props.margins}
        title={props.title}
      >
        <g transform={trans} className={props.className}>
          <XAxis
            xAxisClassName={props.xAxisClassName}
            xScale={scales.xScale}
            xAxisTickValues={props.xAxisTickValues}
            xAxisTickInterval={props.xAxisTickInterval}
            xAxisOffset={props.xAxisOffset}
            tickFormatting={props.xAxisFormatter}
            tickStroke={props.xAxisTickStroke}
            tickTextStroke={props.xAxisTickTextStroke}
            xAxisLabel={props.xAxisLabel}
            xAxisLabelOffset={props.xAxisLabelOffset}
            xOrient={props.xOrient}
            yOrient={yOrient}
            margins={svgMargins}
            width={innerWidth}
            height={innerHeight}
            horizontalChart={props.horizontal}
            gridVertical={props.gridVertical}
            gridVerticalStroke={props.gridVerticalStroke}
            gridVerticalStrokeWidth={props.gridVerticalStrokeWidth}
            gridVerticalStrokeDash={props.gridVerticalStrokeDash}
          />
          <YAxis
            yAxisClassName={props.yAxisClassName}
            yScale={scales.yScale}
            yAxisTickValues={props.yAxisTickValues}
            yAxisOffset={props.yAxisOffset}
            yAxisTickCount={props.yAxisTickCount}
            tickFormatting={props.yAxisFormatter}
            tickStroke={props.yAxisTickStroke}
            tickTextStroke={props.yAxisTickTextStroke}
            yAxisLabel={props.yAxisLabel}
            yAxisLabelOffset={props.yAxisLabelOffset}
            xOrient={props.xOrient}
            yOrient={yOrient}
            margins={svgMargins}
            width={innerWidth}
            height={props.height}
            horizontalChart={props.horizontal}
            gridHorizontal={props.gridHorizontal}
            gridHorizontalStroke={props.gridHorizontalStroke}
            gridHorizontalStrokeWidth={props.gridHorizontalStrokeWidth}
            gridHorizontalStrokeDash={props.gridHorizontalStrokeDash}
          />
          {dataSeries}
        </g>
      </Chart>
    );
  },
});
