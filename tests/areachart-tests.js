'use strict';

const expect = require('chai').expect;
const React = require('react');
const TestUtils = require('react-dom/test-utils');

describe('AreaChart', () => {
  it('renders stacked areachart with array of objects data', () => {
    const AreaChart = require('../src/areachart').AreaChart;
    const generate = require('./utils/datagen').generateArrayOfObjects;

    // Render a areachart using data in array of objects
    const data = [
      {
        name: 'series1',
        values: generate(5)
      },
      {
        name: 'series2',
        values: generate(5)
      }
    ];
    const areachart = TestUtils.renderIntoDocument(
      <AreaChart data={data} width={400} height={200} />
    );

    // Verify that it has the same number of areas as the array's length
    const areas = TestUtils.scryRenderedDOMComponentsWithClass(
      areachart, 'rd3-areachart-area');
    expect(areas).to.have.length(data.length);
  });
});
