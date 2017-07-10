
'use strict';

const PropTypes = require('prop-types');

module.exports = {

  propTypes: {
    viewBox: PropTypes.string,
    viewBoxObject: PropTypes.object,
  },

  getViewBox() {
    if (this.props.viewBoxObject) {
      const v = this.props.viewBoxObject;
      return [v.x, v.y, v.width, v.height].join(' ');
    } else if (this.props.viewBox) {
      return this.props.viewBox;
    }
    return null;
  },

  getDimensions() {
    const props = this.props;
    const { horizontal, margins, viewBoxObject, xOrient } = props;
    const yOrient = this.getYOrient();

    let width;
    let height;
    if (viewBoxObject) {
      width = viewBoxObject.width;
      height = viewBoxObject.height;
    } else {
      width = props.width;
      height = props.height;
    }

    let svgWidth;
    let svgHeight;
    let svgMargins;
    let trans;
    if (horizontal) {
      const center = width / 2;
      trans = `rotate(90 ${center} ${center}) `;
      svgWidth = height;
      svgHeight = width;
      svgMargins = {
        left: margins.top,
        top: margins.right,
        right: margins.bottom,
        bottom: margins.left,
      };
    } else {
      trans = '';
      svgWidth = width;
      svgHeight = height;
      svgMargins = margins;
    }

    const xAxisOffset = Math.abs(props.xAxisOffset || 0);
    const yAxisOffset = Math.abs(props.yAxisOffset || 0);

    const xOffset = svgMargins.left + (yOrient === 'left' ? yAxisOffset : 0);
    const yOffset = svgMargins.top + (xOrient === 'top' ? xAxisOffset : 0);
    trans += `translate(${xOffset}, ${yOffset})`;

    return {
      innerHeight: svgHeight - svgMargins.top - svgMargins.bottom - xAxisOffset,
      innerWidth: svgWidth - svgMargins.left - svgMargins.right - yAxisOffset,
      trans,
      svgMargins,
    };
  },
};
