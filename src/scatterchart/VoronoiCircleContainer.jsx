'use strict';


const React = require('react');
const { findDOMNode } = require('react-dom');
const shade = require('../utils').shade;
const VoronoiCircle = require('./VoronoiCircle');


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
    onMouseOver: React.PropTypes.func,
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

    if (props.hoverAnimation) {
      const rect = findDOMNode(this).getElementsByTagName('circle')[0].getBoundingClientRect();
      this.props.onMouseOver.call(this, rect.right, rect.top, props.dataPoint);
      this.setState({
        circleFill: shade(props.circleFill, props.shadeMultiplier),
        circleRadius: props.circleRadius * props.circleRadiusMultiplier,
      });
    }
  },

  _restoreCircle() {
    const props = this.props;
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
      <g
        className={props.className}
      >
        <VoronoiCircle
          circleFill={state.circleFill}
          circleRadius={state.circleRadius}
          cx={props.cx}
          cy={props.cy}
          handleMouseLeave={this._restoreCircle}
          handleMouseOver={this._animateCircle}
          voronoiPath={this._drawPath(props.vnode)}
        />
      </g>
    );
  },
});
