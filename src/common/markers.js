'use strict';

import React from 'react';
import d3 from 'd3';

export const Rect = props => <rect {...props} />;

export const Wick = (props) =>
  <line
    stroke={'#000'}
    strokeWidth={'1'}
    style={{ shapeRendering: 'crispEdges' }}
    className={'rd3-candlestick-wick'}
    x1={props.wickX1}
    y1={props.wickY1}
    x2={props.wickX2}
    y2={props.wickY2}
  />;

Wick.propTypes = {
  wickX1: React.PropTypes.number,
  wickX2: React.PropTypes.number,
  wickY1: React.PropTypes.number,
  wickY2: React.PropTypes.number,
};

export const Candle = props =>
  <rect
    className={'rd3-candlestick-candle'}
    fill={props.candleFill}
    x={props.candleX}
    y={props.candleY}
    stroke={'#000'}
    strokeWidth={'1'}
    style={{ shapeRendering: 'crispEdges' }}
    width={props.candleWidth}
    height={props.candleHeight}
    {...props}
  />;

Candle.propTypes = {
  candleX: React.PropTypes.number,
  candleY: React.PropTypes.number,
  candleWidth: React.PropTypes.number,
  candleHeight: React.PropTypes.number,
  candleFill: React.PropTypes.string,
};

export const Path = props => <path className="rd3-areachart-area" {...props} />;

export const VoronoiCircle = props =>
    <g>
      <path {...props} fill={"transparent"} />
      <circle {...props} className={"rd3-linechart-circle"} />
    </g>;

const outerLabel = props => {
  const rotate = `rotate(${(props.startAngle + props.endAngle) / 2 * (180 / Math.PI)})`;
  const radius = props.outerRadius;
  const dist = radius + 35;
  const angle = (props.startAngle + props.endAngle) / 2;
  const x = dist * (1.2 * Math.sin(angle));
  const y = -dist * Math.cos(angle);
  const t = `translate(${x},${y})`;

  return (
    <g>
      <line
        x1={'0'}
        x2={'0'}
        y1={-radius - 2}
        y2={-radius - 26}
        stroke={'black'}
        transform={rotate}
        style={{
          fill: props.labelTextFill,
          strokeWidth: 2,
        }}
      >
      </line>
      <text
        className={'rd3-piechart-label'}
        transform={t}
        dy={'.35em'}
        style={{
          textAnchor: 'middle',
          fill: 'black',
          shapeRendering: 'crispEdges',
        }}
      >
        {props.label}
      </text>
    </g>
  );
};

outerLabel.propTypes = {
  startAngle: React.PropTypes.number,
  endAngle: React.PropTypes.number,
  outerRadius: React.PropTypes.number,
  labelTextFill: React.PropTypes.string,
  label: React.PropTypes.string,
};

const innerLabel = (props, arc) => {
  const formattedValue = props.valueTextFormatter(props.value);
  return (
    <text
      className={'rd3-piechart-value'}
      transform={`translate(${arc.centroid()})`}
      dy={'.35em'}
      style={{
        shapeRendering: 'crispEdges',
        textAnchor: 'middle',
        fill: 'white',
      }}
    >
      { formattedValue }
    </text>
  );
};

innerLabel.propTypes = {
  valueTextFormatter: React.PropTypes.func,
  value: React.PropTypes.string,
};

export const Arc = props => {
  const arc = d3.svg.arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius)
    .startAngle(props.startAngle)
    .endAngle(props.endAngle);
  return (
    <g className={'rd3-piechart-arc'} >
      <path
        d={arc()}
        stroke={'black'}
        {...props}
      />
      {outerLabel(props)}
      {innerLabel(props, arc)}
    </g>
  );
};

Arc.propTypes = {
  startAngle: React.PropTypes.number,
  endAngle: React.PropTypes.number,
  outerRadius: React.PropTypes.number,
  innerRadius: React.PropTypes.number,
};

export const Line = props => <path {...props} />;