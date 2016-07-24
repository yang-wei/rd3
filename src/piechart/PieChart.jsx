'use strict';

const d3 = require('d3');
const React = require('react');
const DataSeries = require('./DataSeries');
const { Chart, Tooltip } = require('../common');
const TooltipMixin = require('../mixins').TooltipMixin;

module.exports = React.createClass({

  displayName: 'PieChart',

  propTypes: {
    data: React.PropTypes.array,
    radius: React.PropTypes.number,
    cx: React.PropTypes.number,
    cy: React.PropTypes.number,
    labelTextFill: React.PropTypes.string,
    valueTextFill: React.PropTypes.string,
    valueTextFormatter: React.PropTypes.func,
    colors: React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    title: React.PropTypes.string,
    showInnerLabels: React.PropTypes.bool,
    showOuterLabels: React.PropTypes.bool,
    sectorBorderColor: React.PropTypes.string,
    hoverAnimation: React.PropTypes.bool,
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
