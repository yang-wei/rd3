'use strict';

const React = require('react');
const d3 = require('d3');
const VoronoiCircleContainer = require('./VoronoiCircleContainer');

module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    circleRadius: React.PropTypes.number.isRequired,
    className: React.PropTypes.string,
    colors: React.PropTypes.func.isRequired,
    colorAccessor: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number.isRequired,
    xAccessor: React.PropTypes.func.isRequired,
    xScale: React.PropTypes.func.isRequired,
    yAccessor: React.PropTypes.func.isRequired,
    yScale: React.PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      className: 'rd3-scatterchart-dataseries',
    };
  },

  render() {
    const props = this.props;
    const xScale = props.xScale;
    const yScale = props.yScale;
    const xAccessor = props.xAccessor;
    const yAccessor = props.yAccessor;

    const voronoi = d3.geom.voronoi()
      .x(d => xScale(d.coord.x))
      .y(d => yScale(d.coord.y))
      .clipExtent([[0, 0], [props.width, props.height]]);

    const regions = voronoi(props.data).map((vnode, idx) => {
      const point = vnode.point;
      const coord = point.coord;

      const x = xAccessor(coord);
      const y = yAccessor(coord);

      // The circle coordinates
      let cx;
      let cy;

      if (Object.prototype.toString.call(x) === '[object Date]') {
        cx = xScale(x.getTime());
      } else {
        cx = xScale(x);
      }

      if (Object.prototype.toString.call(y) === '[object Date]') {
        cy = yScale(y.getTime());
      } else {
        cy = yScale(y);
      }

      return (
        <VoronoiCircleContainer
          key={idx}
          circleFill={props.colors(props.colorAccessor(point.d, point.seriesIndex))}
          circleRadius={props.circleRadius}
          cx={cx}
          cy={cy}
          vnode={vnode}
          onMouseOver={props.onMouseOver}
          dataPoint={{ xValue: x, yValue: y, seriesName: point.series.name }}
        />
      );
    });

    return (
      <g
        className={props.className}
      >
        {regions}
      </g>
    );
  },
});
