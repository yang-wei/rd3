'use strict';

var React = require('react');

module.exports =  {

  propTypes: {
    onMouseDown:  React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onMouseDown: null
    };
  },

  onMouseDown(x, y, dataPoint) {
    if(!this.props.onMouseDown)
      return;
    this.props.onMouseDown(dataPoint);
  }
}
