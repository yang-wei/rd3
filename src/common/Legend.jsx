'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const d3 = require('d3');

module.exports = createReactClass({

  displayName: 'Legend',

  propTypes: {
    className: PropTypes.string,
    colors: PropTypes.func,
    colorAccessor: PropTypes.func,
    data: PropTypes.array.isRequired,
    itemClassName: PropTypes.string,
    margins: PropTypes.object,
    text: PropTypes.string,
    width: PropTypes.number.isRequired,
  },

  getDefaultProps() {
    return {
      className: 'rd3-legend',
      colors: d3.scale.category20c(),
      colorAccessor: (d, idx) => idx,
      itemClassName: 'rd3-legend-item',
      text: '#000',
    };
  },

  render() {
    const props = this.props;

    const textStyle = {
      color: 'black',
      fontSize: '50%',
      verticalAlign: 'top',
    };

    const legendItems = [];

    props.data.forEach((series, idx) => {
      const itemStyle = {
        color: props.colors(props.colorAccessor(series, idx)),
        lineHeight: '60%',
        fontSize: '200%',
      };

      legendItems.push(
        <li
          key={idx}
          className={props.itemClassName}
          style={itemStyle}
        >
          <span
            style={textStyle}
          >
            {series.name}
          </span>
        </li>
      );
    });

    const topMargin = props.margins.top;

    const legendBlockStyle = {
      wordWrap: 'break-word',
      width: props.width,
      paddingLeft: 0,
      marginBottom: 0,
      marginTop: topMargin,
      listStylePosition: 'inside',
    };

    return (
      <ul
        className={props.className}
        style={legendBlockStyle}
      >
        {legendItems}
      </ul>
    );
  },
});
