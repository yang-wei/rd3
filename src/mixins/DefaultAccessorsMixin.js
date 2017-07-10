'use strict';

const PropTypes = require('prop-types');

module.exports = {
  propTypes: {
    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
  },

  getDefaultProps() {
    return {
      xAccessor: (d) => d.x,
      yAccessor: (d) => d.y,
    };
  },
};
