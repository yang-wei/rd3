'use strict';

const d3 = require('d3');
const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const Chart = require('../common').Chart;
const DataSeries = require('./DataSeries');

module.exports = createReactClass({

  displayName: 'Treemap',

  propTypes: {
    data: PropTypes.array,
    margins: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    textColor: PropTypes.string,
    fontSize: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    colors: PropTypes.func,
    colorAccessor: PropTypes.func,
    hoverAnimation: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      hoverAnimation: true,
      data: [],
      width: 400,
      heigth: 200,
      title: '',
      textColor: '#f7f7f7',
      fontSize: '0.85em',
      colors: d3.scale.category20c(),
      colorAccessor: (d, idx) => idx,
    };
  },

  render() {
    const props = this.props;
    if (this.props.data && this.props.data.length < 1) {
      return null;
    }

    return (
      <Chart
        title={props.title}
        width={props.width}
        height={props.height}
      >
        <g className="rd3-treemap">
          <DataSeries
            data={props.data}
            width={props.width}
            height={props.height}
            colors={props.colors}
            colorAccessor={props.colorAccessor}
            textColor={props.textColor}
            fontSize={props.fontSize}
            hoverAnimation={props.hoverAnimation}
          />
        </g>
      </Chart>
    );
  },
});
