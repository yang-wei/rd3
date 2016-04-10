'use strict';

const React = require('react');
const d3 = require('d3');
const AreaContainer = require('./AreaContainer');

module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    fill: React.PropTypes.string,
    interpolationType: React.PropTypes.string,
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
