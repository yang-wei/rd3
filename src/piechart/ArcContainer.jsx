'use strict';

const React = require('react');
const { findDOMNode } = require('react-dom');
const shade = require('../utils').shade;
const Arc = require('./Arc');


module.exports = React.createClass({

  displayName: 'ArcContainer',

  propTypes: {
    fill: React.PropTypes.string,
    onMouseOver: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    dataPoint: React.PropTypes.any, // TODO prop type?
  },

  getInitialState() {
    return {
      // fill is named as fill instead of initialFill to avoid
      // confusion when passing down props from top parent
      fill: this.props.fill,
    };
  },

  _animateArc() {
    const rect = findDOMNode(this).getBoundingClientRect();
    this.props.onMouseOver.call(this, rect.right, rect.top, this.props.dataPoint);
    this.setState({
      fill: shade(this.props.fill, 0.2),
    });
  },

  _restoreArc() {
    this.props.onMouseLeave.call(this);
    this.setState({
      fill: this.props.fill,
    });
  },

  render() {
    const props = this.props;

    return (
      <Arc
        {...this.props}
        fill={this.state.fill}
        handleMouseOver={props.hoverAnimation ? this._animateArc : null}
        handleMouseLeave={props.hoverAnimation ? this._restoreArc : null}
      />
    );
  },
});
