'use strict';

const React = require('react');
const utils = require('../utils');
const Candle = require('./Candle');
const Wick = require('./Wick');

module.exports = React.createClass({

  displayName: 'CandleStickContainer',

  propTypes: {
    candleX: React.PropTypes.number,
    candleY: React.PropTypes.number,
    className: React.PropTypes.string,
    candleFill: React.PropTypes.string,
    candleHeight: React.PropTypes.number,
    candleWidth: React.PropTypes.number,
    wickX1: React.PropTypes.number,
    wickX2: React.PropTypes.number,
    wickY1: React.PropTypes.number,
    wickY2: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      className: 'rd3-candlestick-container',
    };
  },

  getInitialState() {
    // state for animation usage
    return {
      candleWidth: this.props.candleWidth,
      candleFill: this.props.candleFill,
    };
  },

  _animateCandle() {
    this.setState({
      candleWidth: this.props.candleWidth * 1.5,
      candleFill: utils.shade(this.props.candleFill, -0.2),
    });
  },

  _restoreCandle() {
    this.setState({
      candleWidth: this.props.candleWidth,
      candleFill: this.props.candleFill,
    });
  },

  render() {
    const props = this.props;
    const state = this.state;

    // animation controller
    let handleMouseOver;
    let handleMouseLeave;
    if (props.hoverAnimation) {
      handleMouseOver = this._animateCandle;
      handleMouseLeave = this._restoreCandle;
    } else {
      handleMouseOver = handleMouseLeave = null;
    }

    return (
      <g className={props.className}>
       <Wick
         wickX1={props.wickX1}
         wickX2={props.wickX2}
         wickY1={props.wickY1}
         wickY2={props.wickY2}
       />
       <Candle
         candleFill={state.candleFill}
         candleWidth={state.candleWidth}
         candleX={props.candleX - ((state.candleWidth - props.candleWidth) / 2)}
         candleY={props.candleY}
         candleHeight={props.candleHeight}
         handleMouseOver={handleMouseOver}
         handleMouseLeave={handleMouseLeave}
       />
      </g>
    );
  },
});
