'use strict';

const React = require('react');
const shade = require('../utils').shade;
const Cell = require('./Cell');


module.exports = React.createClass({

  displayName: 'CellContainer',

  propTypes: {
    fill: React.PropTypes.string,
  },

  getInitialState() {
    return {
      // fill is named as fill instead of initialFill to avoid
      // confusion when passing down props from top parent
      fill: this.props.fill,
    };
  },

  _animateCell() {
    this.setState({
      fill: shade(this.props.fill, 0.05),
    });
  },

  _restoreCell() {
    this.setState({
      fill: this.props.fill,
    });
  },

  render() {
    const props = this.props;

    return (
      <Cell
        {...props}
        fill={this.state.fill}
        handleMouseOver={props.hoverAnimation ? this._animateCell : null}
        handleMouseLeave={props.hoverAnimation ? this._restoreCell : null}
      />
    );
  },
});
