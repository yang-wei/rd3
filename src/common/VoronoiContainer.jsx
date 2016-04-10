'use strict';

const React = require('react');
const shade = require('../utils').shade;
const VoronoiCircle = require('./VoronoiCircle');

module.exports = React.createClass({

  displayName: 'VoronoiContainer',

  // TODO: prop types?
  propTypes: {
    circleRadius: React.PropTypes.any,
    circleFill: React.PropTypes.any,
  },

  getDefaultProps() {
    return {
      circleRadius: 3,
      circleFill: '#1f77b4',
      hoverAnimation: true,
    };
  },

  getInitialState() {
    return {
      circleRadius: this.props.circleRadius,
      circleFill: this.props.circleFill,
    };
  },

  _animateCircle() {
    this.setState({
      circleRadius: this.props.circleRadius * (5 / 4),
      circleFill: shade(this.props.circleFill, 0.2),
    });
  },

  _restoreCircle() {
    this.setState({
      circleRadius: this.props.circleRadius,
      circleFill: this.props.circleFill,
    });
  },

  _drawPath(d) {
    if (d === undefined) {
      return 'M Z';
    }
    return `M${d.join(',')}Z`;
  },

  render() {
    const props = this.props;

    // animation controller
    let handleMouseOver;
    let handleMouseLeave;
    if (props.hoverAnimation) {
      handleMouseOver = this._animateCircle;
      handleMouseLeave = this._restoreCircle;
    } else {
      handleMouseOver = handleMouseLeave = null;
    }

    return (
      <g>
        <VoronoiCircle
          handleMouseOver={handleMouseOver}
          handleMouseLeave={handleMouseLeave}
          voronoiPath={this._drawPath(props.vnode)}
          cx={props.cx}
          cy={props.cy}
          circleRadius={this.state.circleRadius}
          circleFill={this.state.circleFill}
        />
      </g>
    );
  },
});
