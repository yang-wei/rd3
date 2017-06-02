'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const LegendChart = require('./LegendChart');
const BasicChart = require('./BasicChart');

module.exports = createReactClass({

  displayName: 'Chart',

  propTypes: {
    legend: PropTypes.bool,
    svgClassName: PropTypes.string,
    titleClassName: PropTypes.string,
    shouldUpdate: PropTypes.bool,
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
