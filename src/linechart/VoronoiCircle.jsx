'use strict';

const React = require('react');

module.exports = React.createClass({

  displayName: 'VoronoiCircle',

  // TODO: Check prop types
  propTypes: {
    handleMouseOver: React.PropTypes.any,
    handleMouseLeave: React.PropTypes.any,
    voronoiPath: React.PropTypes.any,
    cx: React.PropTypes.any,
    cy: React.PropTypes.any,
    circleRadius: React.PropTypes.any,
    circleFill: React.PropTypes.any,
  },

  getDefaultProps() {
    return {
      circleRadius: 3,
      circleFill: '#1f77b4',
    };
  },

  render() {
    return (
      <g>
        <path
          onMouseOver={this.props.handleMouseOver}
          onMouseLeave={this.props.handleMouseLeave}
          fill="transparent"
          d={this.props.voronoiPath}
        />
        <circle
          onMouseOver={this.props.handleMouseOver}
          onMouseLeave={this.props.handleMouseLeave}
          cx={this.props.cx}
          cy={this.props.cy}
          r={this.props.circleRadius}
          fill={this.props.circleFill}
          className="rd3-linechart-circle"
        />
      </g>
    );
  },
});
