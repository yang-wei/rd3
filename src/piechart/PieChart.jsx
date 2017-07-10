'use strict';

const d3 = require('d3');
const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');

const DataSeries = require('./DataSeries');
const { Chart, Tooltip } = require('../common');
const TooltipMixin = require('../mixins').TooltipMixin;

module.exports = createReactClass({

  displayName: 'PieChart',

  propTypes: {
    data: PropTypes.array,
    radius: PropTypes.number,
    cx: PropTypes.number,
    cy: PropTypes.number,
    labelTextFill: PropTypes.string,
    valueTextFill: PropTypes.string,
    valueTextFormatter: PropTypes.func,
    colors: PropTypes.func,
    colorAccessor: PropTypes.func,
    title: PropTypes.string,
    showInnerLabels: PropTypes.bool,
    showOuterLabels: PropTypes.bool,
    sectorBorderColor: PropTypes.string,
    hoverAnimation: PropTypes.bool,
  },

  mixins: [TooltipMixin],

  getDefaultProps() {
    return {
      data: [],
      title: '',
      colors: d3.scale.category20c(),
      colorAccessor: (d, idx) => idx,
      valueTextFormatter: (val) => `${val}%`,
      hoverAnimation: true,
    };
  },

  render() {
    const props = this.props;

    if (props.data && props.data.length < 1) {
      return null;
    }
    const transform = `translate(${props.cx || props.width / 2},${props.cy || props.height / 2})`;

    const values = props.data.map((item) => item.value);
    const labels = props.data.map((item) => item.label);

    return (
      <span>
        <Chart
          width={props.width}
          height={props.height}
          title={props.title}
          shouldUpdate={!this.state.changeState}
        >
          <g className="rd3-piechart">
            <DataSeries
              labelTextFill={props.labelTextFill}
              valueTextFill={props.valueTextFill}
              valueTextFormatter={props.valueTextFormatter}
              data={props.data}
              values={values}
              labels={labels}
              colors={props.colors}
              colorAccessor={props.colorAccessor}
              transform={transform}
              width={props.width}
              height={props.height}
              radius={props.radius}
              innerRadius={props.innerRadius}
              showInnerLabels={props.showInnerLabels}
              showOuterLabels={props.showOuterLabels}
              sectorBorderColor={props.sectorBorderColor}
              hoverAnimation={props.hoverAnimation}
              onMouseOver={this.onMouseOver}
              onMouseLeave={this.onMouseLeave}
            />
          </g>
        </Chart>
        {(props.showTooltip ? <Tooltip {...this.state.tooltip} /> : null)}
      </span>
    );
  },
});
