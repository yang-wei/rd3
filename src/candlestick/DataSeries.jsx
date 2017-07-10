'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const CandlestickContainer = require('./CandlestickContainer');

module.exports = createReactClass({

  displayName: 'DataSeries',

  propTypes: {
    fillUp: PropTypes.string.isRequired,
    fillDown: PropTypes.string.isRequired,
  },

  render() {
    const props = this.props;

    const xRange = props.xScale.range();
    const width = Math.abs(xRange[0] - xRange[1]);
    const candleWidth = (width / (props.data.length + 2)) * 0.5;

    const dataSeriesArray = props.data.map((d, idx) => {
      // Candles
      const ohlc = props.yAccessor(d);
      const candleX = props.xScale(props.xAccessor(d)) - 0.5 * candleWidth;
      const candleY = props.yScale(Math.max(ohlc.open, ohlc.close));
      const candleHeight = Math.abs(props.yScale(ohlc.open) - props.yScale(ohlc.close));
      const wickY2 = props.yScale(ohlc.low);
      const candleFill = (ohlc.open <= ohlc.close) ? props.fillUp : props.fillDown;

      // Wicks
      const wickX1 = props.xScale(props.xAccessor(d));
      const wickY1 = props.yScale(ohlc.high);
      const wickX2 = wickX1;

      return (
        <CandlestickContainer
          key={idx}
          candleFill={candleFill}
          candleHeight={candleHeight}
          candleWidth={candleWidth}
          candleX={candleX}
          candleY={candleY}
          wickX1={wickX1}
          wickX2={wickX2}
          wickY1={wickY1}
          wickY2={wickY2}
          hoverAnimation={props.hoverAnimation}
        />
      );
    }, this);

    return (
      <g>
        {dataSeriesArray}
      </g>
    );
  },
});
