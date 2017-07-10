'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const shade = require('../utils').shade;
const Area = require('./Area');

module.exports = createReactClass({

  displayName: 'AreaContainer',

  propTypes: {
    fill: PropTypes.string,
  },

  getDefaultProps() {
    return {
      fill: '#3182bd',
    };
  },

  getInitialState() {
    return {
      fill: this.props.fill,
    };
  },

  _animateArea() {
    this.setState({
      fill: shade(this.props.fill, 0.02),
    });
  },

  _restoreArea() {
    this.setState({
      fill: this.props.fill,
    });
  },

  render() {
    const props = this.props;

    // animation controller
    let handleMouseOver;
    let handleMouseLeave;
    if (props.hoverAnimation) {
      handleMouseOver = this._animateArea;
      handleMouseLeave = this._restoreArea;
    } else {
      handleMouseOver = handleMouseLeave = null;
    }

    return (
      <Area
        handleMouseOver={handleMouseOver}
        handleMouseLeave={handleMouseLeave}
        {...props}
        fill={this.state.fill}
      />
    );
  },
});
