'use strict';

const React = require('react');

module.exports = React.createClass({

  // TODO: PropTypes.any
  propTypes: {
    structure: React.PropTypes.any,
    id: React.PropTypes.any,
    vnode: React.PropTypes.any,
  },

  _animateCircle() {
    this.props.structure.cursor('voronoi').cursor(this.props.id).update(() => 'active');
    // this.props.pubsub.emit('animate', this.props.id);
  },

  _restoreCircle() {
    this.props.structure.cursor('voronoi').cursor(this.props.id).update(() => 'inactive');
    // this.props.pubsub.emit('restore', this.props.id);
  },

  _drawPath(d) {
    if (d === undefined) {
      return '';
    }
    return `M${d.join(',')}Z`;
  },

  render() {
    return (<path
      onMouseOver={this._animateCircle}
      onMouseOut={this._restoreCircle}
      fill="white"
      opacity="0"
      d={this._drawPath(this.props.vnode)}
    />);
  },
});
