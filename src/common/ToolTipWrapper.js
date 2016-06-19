'use strict';

import React from 'react';
import { findDOMNode } from 'react-dom';

const _renderToolTip = function (state) {
  if(!state.dataPoint) {
    return;
  }
  const containerStyles = {
    position: 'fixed',
    top: state.y,
    left: state.x,
    display: 'inherit',
    opacity: 0.8,
  };
  // TODO: add 'right: 0px' style when tooltip is off the chart
  const tooltipStyles = {
    position: 'absolute',
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: '#ddd',
    borderRadius: '2px',
    padding: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '-15px',
  };
  return (
    <div style={containerStyles}>
      <div style={tooltipStyles}>
        {String(state.dataPoint.yValue)}
      </div>
    </div>
  );
};

export function toolTipWrapper(Component, toolTip = _renderToolTip) {

  return React.createClass({

    getInitialState() {
      return {
        tooltip: {
          x: 0,
          y: 0,
          dataPoint: '',
          show: false,
        }
      };
    },

    onMouseOver(dataPoint, dom) {
      if(dom === undefined) return;
      const rect = findDOMNode(dom).getBoundingClientRect();
      this.setState({
        tooltip: {
          x: rect.right,
          y: rect.top,
          dataPoint: dataPoint,
          show: true,
        }
      });
    },

    onMouseLeave() {
      this.setState({
        tooltip: {
          x: 0,
          y: 0,
          child: '',
          show: false,
        }
      });
    },

    render() {
      return (
        <div>
          <Component
            {...this.props}
            {...this.state}
            onMouseOver={this.onMouseOver}
            onMouseLeave={this.onMouseLeave}
          />
          {toolTip(this.state.tooltip)}
        </div>
      )
    },
  });
};
