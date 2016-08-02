'use strict';

import React, { Component } from 'react';

export default class BasicChart extends Component {
  render() {
    const props = this.props;
    return (
      <svg
        height={props.height}
        viewBox={props.viewBox}
        width={props.width}
      >
        {props.children}
      </svg>
    );
  }
}

BasicChart.propTypes = {
    children: React.PropTypes.node,
    height: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
}

BasicChart.defaultProps = {
  height: 400,
  width: 400,
}
