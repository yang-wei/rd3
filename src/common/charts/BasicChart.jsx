'use strict';

const React = require('react');

module.exports = React.createClass({

  displayName: 'BasicChart',

  propTypes: {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    height: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    svgClassName: React.PropTypes.string,
    title: React.PropTypes.node,
    titleClassName: React.PropTypes.string,
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
  },

  getDefaultProps() {
    return {
      className: 'rd3-basic-chart',
      svgClassName: 'rd3-chart',
      titleClassName: 'rd3-chart-title',
      title: '',
    };
  },

  _renderTitle() {
    const props = this.props;

    if (props.title !== '') {
      return (
        <h4
          className={props.titleClassName}
        >
          {props.title}
        </h4>
      );
    }
    return null;
  },

  _renderChart() {
    const props = this.props;

    return (
      <svg
        className={props.svgClassName}
        height={props.height}
        viewBox={props.viewBox}
        width={props.width}
      >
        {props.children}
      </svg>
    );
  },

  render() {
    const props = this.props;

    return (
      <div
        className={props.className}
      >
        {this._renderTitle()}
        {this._renderChart()}
      </div>
    );
  },
});
