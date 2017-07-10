'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const d3 = require('d3');
const VoronoiCircleContainer = require('./VoronoiCircleContainer');
const Line = require('./Line');

module.exports = createReactClass({

  displayName: 'DataSeries',

  propTypes: {
    color: PropTypes.func,
    colorAccessor: PropTypes.func,
    data: PropTypes.array,
    interpolationType: PropTypes.string,
    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
    hoverAnimation: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      data: [],
      xAccessor: (d) => d.x,
      yAccessor: (d) => d.y,
      interpolationType: 'linear',
      hoverAnimation: false,
    };
  },

  _isDate(d, accessor) {
    return Object.prototype.toString.call(accessor(d)) === '[object Date]';
  },

  render() {
    const props = this.props;
    const xScale = props.xScale;
    const yScale = props.yScale;
    const xAccessor = props.xAccessor;
    const yAccessor = props.yAccessor;

    const interpolatePath = d3.svg.line()
        .y((d) => props.yScale(yAccessor(d)))
        .interpolate(props.interpolationType);

    if (this._isDate(props.data[0].values[0], xAccessor)) {
      interpolatePath.x(d => props.xScale(props.xAccessor(d).getTime()));
    } else {
      interpolatePath.x(d => props.xScale(props.xAccessor(d)));
    }

    const lines = props.data.map((series, idx) => (
        <Line
          path={interpolatePath(series.values)}
          stroke={props.colors(props.colorAccessor(series, idx))}
          strokeWidth={series.strokeWidth}
          strokeDashArray={series.strokeDashArray}
          seriesName={series.name}
          key={idx}
        />
      )
    );

    const voronoi = d3.geom.voronoi()
      .x(d => xScale(d.coord.x))
      .y(d => yScale(d.coord.y))
      .clipExtent([[0, 0], [props.width, props.height]]);

    let cx;
    let cy;
    let circleFill;
    const regions = voronoi(props.value).map((vnode, idx) => {
      const point = vnode.point.coord;
      cx = props.xScale(point.x);
      cy = props.yScale(point.y);

      circleFill = props.colors(props.colorAccessor(vnode, vnode.point.seriesIndex));

      return (
        <VoronoiCircleContainer
          key={idx}
          circleFill={circleFill}
          vnode={vnode}
          hoverAnimation={props.hoverAnimation}
          cx={cx} cy={cy}
          circleRadius={props.circleRadius}
          onMouseOver={props.onMouseOver}
          dataPoint={{
            xValue: point.x,
            yValue: point.y,
            seriesName: vnode.point.series.name,
          }}
        />
      );
    });

    return (
      <g>
        <g>{regions}</g>
        <g>{lines}</g>
      </g>
    );
  },
});
