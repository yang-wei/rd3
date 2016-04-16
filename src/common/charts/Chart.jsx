'use strict';

const React = require('react');
const LegendChart = require('./LegendChart');
const BasicChart = require('./BasicChart');

module.exports = React.createClass({

  displayName: 'Chart',

  propTypes: {
    legend: React.PropTypes.bool,
    svgClassName: React.PropTypes.string,
    titleClassName: React.PropTypes.string,
    shouldUpdate: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      legend: false,
      svgClassName: 'rd3-chart',
      titleClassName: 'rd3-chart-title',
      shouldUpdate: true,
    };
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  },

  render() {
    const props = this.props;

    if (props.legend) {
      return (
        <LegendChart
          svgClassName={props.svgClassName}
          titleClassName={props.titleClassName}
          {...this.props}
        />
      );
    }
    return (
      <BasicChart
        svgClassName={props.svgClassName}
        titleClassName={props.titleClassName}
        {...this.props}
      />
    );
  },
});
