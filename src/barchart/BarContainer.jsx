'use strict';

const React = require('react');
const { findDOMNode } = require('react-dom');
const Bar = require('./Bar');
const shade = require('../utils').shade;


module.exports = React.createClass({

  propTypes: {
    fill: React.PropTypes.string,
    onMouseOver: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    dataPoint: React.PropTypes.any, // TODO: prop types?
  },

  getDefaultProps() {
    return {
      fill: '#3182BD',
    };
  },

  getInitialState() {
    return {
      // fill is named as fill instead of initialFill to avoid
      // confusion when passing down props from top parent
      fill: this.props.fill,
    };
  },

  _animateBar() {
    const handlers = this.props.onMouseOverHandlers;
    const dataPoint = this.props.dataPoint;
    const rect = this;
    handlers.forEach(f => f(dataPoint, rect));

    this.setState({
      fill: shade(this.props.fill, 0.2),
    });
  },

  _restoreBar() {
    const handlers = this.props.onMouseLeaveHandlers;
    handlers.forEach(f => f());
    this.setState({
      fill: this.props.fill,
    });
  },

  render() {
    const props = this.props;

    return (
      <Bar
        {...props}
        fill={this.state.fill}
        handleMouseOver={props.hoverAnimation ? this._animateBar : null}
        handleMouseLeave={props.hoverAnimation ? this._restoreBar : null}
      />
    );
  },
});
