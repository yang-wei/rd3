'use strict';

import React, { Component } from 'react';

export default class SvgContainer extends Component {
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

SvgContainer.propTypes = {
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

SvgContainer.defaultProps = {
  height: 400,
  width: 400,
}
