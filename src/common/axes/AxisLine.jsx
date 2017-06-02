'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');


module.exports = createReactClass({

  displayName: 'AxisLine',

  propTypes: {
    scale: PropTypes.func.isRequired,
    innerTickSize: PropTypes.number,
    outerTickSize: PropTypes.number,
    tickPadding: PropTypes.number,
    tickArguments: PropTypes.array,
    fill: PropTypes.string,
    stroke: PropTypes.string,
  },

  getDefaultProps() {
    return {
      innerTickSize: 6,
      outerTickSize: 6,
      tickPadding: 3,
      fill: 'none',
      tickArguments: [10],
      tickValues: null,
      tickFormat: null,
    };
  },


  _d3_scaleExtent(domain) {
    const start = domain[0];
    const stop = domain[domain.length - 1];
    return start < stop ? [start, stop] : [stop, start];
  },

  _d3_scaleRange(scale) {
    return scale.rangeExtent ? scale.rangeExtent() : this._d3_scaleExtent(scale.range());
  },

  render() {
    const props = this.props;
    const sign = props.orient === 'top' || props.orient === 'left' ? -1 : 1;

    const range = this._d3_scaleRange(props.scale);

    let d;
    if (props.orient === 'bottom' || props.orient === 'top') {
      d = `M${range[0]},${sign * props.outerTickSize}V0H${range[1]}V${sign * props.outerTickSize}`;
    } else {
      d = `M${sign * props.outerTickSize},${range[0]}H0V${range[1]}H${sign * props.outerTickSize}`;
    }

    return (
      <path
        className="domain"
        d={d}
        style={{ shapeRendering: 'crispEdges' }}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
      >
      </path>
    );
  },
});
