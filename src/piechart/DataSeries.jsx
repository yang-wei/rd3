'use strict';

const React = require('react');
const d3 = require('d3');
const ArcContainer = require('./ArcContainer');


module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    data: React.PropTypes.array,
    values: React.PropTypes.array,
    labels: React.PropTypes.array,
    transform: React.PropTypes.string,
    innerRadius: React.PropTypes.number,
    radius: React.PropTypes.number,
    colors: React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    showInnerLabels: React.PropTypes.bool,
    showOuterLabels: React.PropTypes.bool,
    sectorBorderColor: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      data: [],
      innerRadius: 0,
      colors: d3.scale.category20c(),
      colorAccessor: (d, idx) => idx,
    };
  },

  render() {
    const props = this.props;

    const pie = d3.layout
      .pie()
      .sort(null);

    const arcData = pie(props.values);

    const arcs = arcData.map((arc, idx) => (
        <ArcContainer
          key={idx}
          startAngle={arc.startAngle}
          endAngle={arc.endAngle}
          outerRadius={props.radius}
          innerRadius={props.innerRadius}
          labelTextFill={props.labelTextFill}
          valueTextFill={props.valueTextFill}
          valueTextFormatter={props.valueTextFormatter}
          fill={props.colors(props.colorAccessor(props.data[idx], idx))}
          value={props.values[idx]}
          label={props.labels[idx]}
          width={props.width}
          showInnerLabels={props.showInnerLabels}
          showOuterLabels={props.showOuterLabels}
          sectorBorderColor={props.sectorBorderColor}
          hoverAnimation={props.hoverAnimation}
          onMouseOver={props.onMouseOver}
          onMouseLeave={props.onMouseLeave}
          dataPoint={{ yValue: props.values[idx], seriesName: props.labels[idx] }}
        />
      )
    );
    return (
      <g className="rd3-piechart-pie" transform={props.transform} >
        {arcs}
      </g>
    );
  },
});
