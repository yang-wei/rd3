'use strict';

import React from 'react';

module.exports = React.createClass({

  propTypes: {
    onMouseOver: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    dataPoint: React.PropTypes.any, // TODO: prop types?
    svgComponent: React.PropTypes.func.isRequired,
  },

  onMouseOver() {
    this.props.onMouseOver(this.props.dataPoint, this);
  },

  onMouseLeave() {
    this.props.onMouseLeave(this.props.dataPoint, this);
  },

  render() {
    const Component = this.props.svgComponent;
    return (
      <Component
        {...this.props}
        {...this.state}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
      />
    );
  },

});
