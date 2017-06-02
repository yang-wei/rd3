'use strict';

const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');


module.exports = createReactClass({

  propTypes: {
    cx: PropTypes.number,
    cy: PropTypes.number,
    r: PropTypes.number,
    fill: PropTypes.string,
    className: PropTypes.string,
    voronoiRef: PropTypes.any, // TODO: prop types?
  },

  getDefaultProps() {
    return {
      fill: '#1f77b4',
    };
  },

  getInitialState() {
    // state for animation usage
    return {
      circleRadius: this.props.r,
      circleColor: this.props.fill,
    };
  },

  componentDidMount() {
    const props = this.props;
    // The circle reference is observed when both it is set to
    // active, and to inactive, so we have to check which one
    props.voronoiRef.observe(() => {
      const circleStatus = props.voronoiRef.cursor().deref();
      const seriesName = props.id.split('-')[0];
      if (circleStatus === 'active') {
        this._animateCircle(props.id);
        const voronoiSeriesCursor = props.structure.cursor('voronoiSeries');
        if (voronoiSeriesCursor) {
          voronoiSeriesCursor.cursor(seriesName).update(() => 'active');
        }
      } else if (circleStatus === 'inactive') {
        this._restoreCircle(props.id);
        props.structure.cursor('voronoiSeries').cursor(seriesName).update(() => 'inactive');
      }
    });
  },

  componentWillUnmount() {
    this.props.voronoiRef.destroy();
  },

  _animateCircle() {
    this.setState({
      circleRadius: this.state.circleRadius * (5 / 4),
    });
  },

  _restoreCircle() {
    this.setState({
      circleRadius: this.props.r,
    });
  },

  render() {
    const props = this.props;
    return (
      <circle
        cx={props.cx}
        cy={props.cy}
        r={this.state.circleRadius}
        fill={this.state.circleColor}
        id={props.id}
        className={props.className}
      />
    );
  },
});
