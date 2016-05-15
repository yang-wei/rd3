# Responsive Charts

Sometimes, we need responsive chart for e.g. handling resizing event, or etc.
So, how can we handle this issue?

We can handle this issue with chart wrapper. We will wrap Chart component with normal div, which is styled (width / height specified), and add event listener for dealing with window resize event.

``` jsx
import React from 'react';
import d3 from 'd3';
import rd3 from 'rd3';

const {
  AreaChart,
  BarChart,
  CandleStickChart,
  LineChart,
  PieChart,
  ScatterChart,
  Treemap,
} = rd3;

const createClass = (chartType) => {
  class Chart extends React.Component {
    constructor(props) {
      super(props);
      this.state = { size: { w: 0, h: 0 } };
    }

    fitToParentSize() {
      const w = this.refs.wrapper.offsetWidth - 20;
      const h = this.refs.wrapper.offsetHeight - 20;
      const currentSize = this.state.size;
      if (w !== currentSize.w || h !== currentSize.h) {
        this.setState({
          size: { w, h },
        });
      }
    }

    getChartClass() {
      let Component;
      switch (chartType) {
        case 'AreaChart':
          Component = AreaChart;
          break;
        case 'BarChart':
          Component = BarChart;
          break;
        case 'CandleStickChart':
          Component = CandleStickChart;
          break;
        case 'LineChart':
          Component = LineChart;
          break;
        case 'PieChart':
          Component = PieChart;
          break;
        case 'ScatterChart':
          Component = ScatterChart;
          break;
        case 'Treemap':
          Component = Treemap;
          break;
        default:
          console.error('Invalid Chart Type name.');
          break;
      }
      return Component;
    }

    componentDidMount() {
      window.addEventListener('resize', ::this.fitToParentSize);
      this.fitToParentSize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', ::this.fitToParentSize);
    }

    render() {
      const { duration, margin, ...others } = this.props;
      let Component = this.getChartClass();
      let width = this.props.width;
      let height = this.props.height;
      width = this.state.size.w || 100;
      height = this.state.size.h || 100;
      return (
        <div className="chart-wrapper" ref="wrapper">
          <Component
            width = {width}
            height = {height}
            margin = {margin}
            {...others}
          />
        </div>
      );
    }
  }
  Chart.defaultProps = {
    margin: {
    },
  };
  Chart.propTypes = {
    duration: React.PropTypes.array.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    margin: React.PropTypes.object,
  };
  return Chart;
};

const ResponsiveAreaChart = createClass('AreaChart');
const ResponsiveBarChart = createClass('BarChart');
const ResponsiveCandleStickChart = createClass('CandleStickChart');
const ResponsiveLineChart = createClass('LineChart');
const ResponsivePieChart = createClass('PieChart');
const ResponsiveScatterChart = createClass('ScatterChart');
const ResponsiveTreemap = createClass('Treemap');

export {
  ResponsiveAreaChart,
  ResponsiveBarChart,
  ResponsiveCandleStickChart,
  ResponsiveLineChart,
  ResponsivePieChart,
  ResponsiveScatterChart,
  ResponsiveTreemap,
};

export default {
  ResponsiveAreaChart,
  ResponsiveBarChart,
  ResponsiveCandleStickChart,
  ResponsiveLineChart,
  ResponsivePieChart,
  ResponsiveScatterChart,
  ResponsiveTreemap,
};
```

In this block,

``` jsx
return (
  <div className="chart-wrapper" ref="wrapper">
    <Component
      width = {width}
      height = {height}
      margin = {margin}
      {...others}
    />
  </div>
);
```

You can see `Component` is wrapped by `div`. Then, you should define style(width/height) by css or by code directly.

``` css
.chart-wrapper {
  height: 300px;
  width: calc(100% - 20px);
  padding: 10px;
}
```

Finally, you can check the chart resizing on window resize event.

## Reference
* react-d3-components
    * [Dynamic sizes of charts (#9)](https://github.com/codesuki/react-d3-components/issues/9)
    * [Wrapper for react-d3-components](https://github.com/codesuki/react-d3-components/issues/9#issuecomment-136632734)
