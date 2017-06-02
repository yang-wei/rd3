'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const d3 = require('d3');
const CellContainer = require('./CellContainer');

module.exports = createReactClass({

  displayName: 'DataSeries',

  propTypes: {
    data: PropTypes.array,
    colors: PropTypes.func,
    colorAccessor: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
  },

  getDefaultProps() {
    return {
      data: [],
      colors: d3.scale.category20c(),
      colorAccessor: (d, idx) => idx,
    };
  },

  render() {
    const props = this.props;

    const treemap = d3.layout.treemap()
                    // make sure calculation loop through all objects inside array
                    .children(d => d)
                    .size([props.width, props.height])
                    .sticky(true)
                    .value(d => d.value);

    const tree = treemap(props.data);

    const cells = tree.map((node, idx) => (
        <CellContainer
          key={idx}
          x={node.x}
          y={node.y}
          width={node.dx}
          height={node.dy}
          fill={props.colors(props.colorAccessor(node, idx))}
          label={node.label}
          fontSize={props.fontSize}
          textColor={props.textColor}
          hoverAnimation={props.hoverAnimation}
        />
      ), this);

    return (
      <g transform={props.transform} className="treemap">
        {cells}
      </g>
    );
  },
});
