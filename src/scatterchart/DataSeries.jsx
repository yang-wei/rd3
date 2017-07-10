'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const d3 = require('d3');
const VoronoiCircleContainer = require('./VoronoiCircleContainer');

module.exports = createReactClass({

  displayName: 'DataSeries',

  propTypes: {
    circleRadius: PropTypes.number.isRequired,
    className: PropTypes.string,
    colors: PropTypes.func.isRequired,
    colorAccessor: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    xAccessor: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yAccessor: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
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
