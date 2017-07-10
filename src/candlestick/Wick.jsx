'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');


module.exports = createReactClass({

  displayName: 'Wick',

  propTypes: {
    className: PropTypes.string,
    shapeRendering: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
  },

  getDefaultProps() {
    return {
      className: 'rd3-candlestick-wick',
      stroke: '#000',
      strokeWidth: 1,
      shapeRendering: 'crispEdges',
    };
  },

  render() {
    const props = this.props;
    return (<line
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
      style={{ shapeRendering: props.shapeRendering }}
      className={props.className}
      x1={props.wickX1}
      y1={props.wickY1}
      x2={props.wickX2}
      y2={props.wickY2}
    />);
  },
});
