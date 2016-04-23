'use strict';

const React = require('react');
const d3 = require('d3');
const Polygon = require('./Polygon');


module.exports = React.createClass({

  displayName: 'Voronoi',

  // TODO: PropTypes.any
  propTypes: {
    xScale: React.PropTypes.any,
    yScale: React.PropTypes.any,
    width: React.PropTypes.any,
    height: React.PropTypes.any,
    structure: React.PropTypes.any,
    data: React.PropTypes.any,
  },

  render() {
    const xScale = this.props.xScale;
    const yScale = this.props.yScale;

    const voronoi = d3.geom.voronoi()
      .x(d => xScale(d.coord.x))
      .y(d => yScale(d.coord.y))
      .clipExtent([[0, 0], [this.props.width, this.props.height]]);

    const regions = voronoi(this.props.data).map((vnode, idx) => (
      <Polygon structure={this.props.structure} key={idx} id={vnode.point.id} vnode={vnode} />
    ));

    return (
      <g>
        {regions}
      </g>
    );
  },
});
