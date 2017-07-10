'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');


module.exports = createReactClass({

  displayName: 'Cell',

  propTypes: {
    fill: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    label: PropTypes.string,
  },

  render() {
    const props = this.props;

    const textStyle = {
      textAnchor: 'middle',
      fill: props.textColor,
      fontSize: props.fontSize,
    };

    const t = `translate(${props.x}, ${props.y}  )`;

    return (
      <g transform={t}>
        <rect
          className="rd3-treemap-cell"
          width={props.width}
          height={props.height}
          fill={props.fill}
          onMouseOver={props.handleMouseOver}
          onMouseLeave={props.handleMouseLeave}
        />
        <text
          x={props.width / 2}
          y={props.height / 2}
          dy=".35em"
          style={textStyle}
          className="rd3-treemap-cell-text"
        >
          {props.label}
        </text>
      </g>
    );
  },
});
