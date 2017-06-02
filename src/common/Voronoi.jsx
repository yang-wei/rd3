'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');
const d3 = require('d3');
const Polygon = require('./Polygon');


module.exports = createReactClass({

  displayName: 'Voronoi',

  // TODO: PropTypes.any
  propTypes: {
    xScale: PropTypes.any,
    yScale: PropTypes.any,
    width: PropTypes.any,
    height: PropTypes.any,
    structure: PropTypes.any,
    data: PropTypes.any,
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
