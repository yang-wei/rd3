'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const d3 = require('d3');
const AreaContainer = require('./AreaContainer');

module.exports = createReactClass({

  displayName: 'DataSeries',

  propTypes: {
    fill: PropTypes.string,
    interpolationType: PropTypes.string,
  },

  getDefaultProps() {
    return {
      interpolationType: 'linear',
    };
  },

  render() {
    const props = this.props;

    const area = d3.svg.area()
      .x((d) => props.xScale(props.xAccessor(d)))
      .y0((d) => props.yScale(d.y0))
      .y1((d) => props.yScale(d.y0 + props.yAccessor(d)))
      .interpolate(props.interpolationType);

    const path = area(props.data);

    return (
      <AreaContainer
        fill={props.fill}
        hoverAnimation={props.hoverAnimation}
        path={path}
      />
    );
  },
});
