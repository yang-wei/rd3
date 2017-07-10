'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');


module.exports = createReactClass({

  displayName: 'Candle',

  propTypes: {
    className: PropTypes.string,
    shapeRendering: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
  },

  getDefaultProps() {
    return {
      className: 'rd3-candlestick-candle',
      shapeRendering: 'crispEdges',
      stroke: '#000',
      strokeWidth: 1,
    };
  },

  render() {
    const props = this.props;

    return (
      <rect
        className={props.className}
        fill={props.candleFill}
        x={props.candleX}
        y={props.candleY}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
        style={{ shapeRendering: props.shapeRendering }}
        width={props.candleWidth}
        height={props.candleHeight}
        onMouseOver={props.handleMouseOver}
        onMouseLeave={props.handleMouseLeave}
      />
    );
  },
});
