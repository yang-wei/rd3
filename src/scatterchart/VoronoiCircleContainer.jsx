'use strict';


const React = require('react');
const { findDOMNode } = require('react-dom');
const shade = require('../utils').shade;
import { VoronoiCircle } from '../common/markers'

module.exports = React.createClass({

  displayName: 'VornoiCircleContainer',

  propTypes: {
    circleFill: React.PropTypes.string,
    circleRadius: React.PropTypes.number,
    circleRadiusMultiplier: React.PropTypes.number,
    className: React.PropTypes.string,
    hoverAnimation: React.PropTypes.bool,
    shadeMultiplier: React.PropTypes.number,
    vnode: React.PropTypes.array.isRequired,
  },

  getDefaultProps() {
    return {
      circleFill: '#1f77b4',
      circleRadius: 3,
      circleRadiusMultiplier: 1.25,
      className: 'rd3-scatterchart-voronoi-circle-container',
      hoverAnimation: true,
      shadeMultiplier: 0.2,
    };
  },

  getInitialState() {
    return {
      circleFill: this.props.circleFill,
      circleRadius: this.props.circleRadius,
    };
  },

  _animateCircle() {
    const props = this.props;
    const rect = this;
    const handlers = props.onMouseOverHandlers;
    const dataPoint = props.dataPoint;
    handlers.forEach(f => f(dataPoint, rect));

    if (props.hoverAnimation) {
      this.setState({
        circleFill: shade(props.circleFill, props.shadeMultiplier),
        circleRadius: props.circleRadius * props.circleRadiusMultiplier,
      });
    }
  },

  _restoreCircle() {

    const props = this.props;
    props.onMouseLeaveHandlers.forEach(f => f());

    if (props.hoverAnimation) {
      this.setState({
        circleFill: props.circleFill,
        circleRadius: props.circleRadius,
      });
    }
  },

  _drawPath(d) {
    if (typeof d === 'undefined') {
      return 'M Z';
    }

    return `M${d.join(',')}Z`;
  },

  render() {
    const props = this.props;
    const state = this.state;

    return (
      <VoronoiCircle
        onMouseOver={this._restoreCircle}
        onMouseLeave={this._animateCircle}
        d={this._drawPath(props.vnode)}
        cx={props.cx}
        cy={props.cy}
        r={this.state.circleRadius}
        fill={this.state.circleFill}
      />
    );
  },
});
