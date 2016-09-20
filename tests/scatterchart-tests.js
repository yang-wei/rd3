'use strict';

var expect = require('chai').expect;
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var { ScatterChart } = require('../src/scatterchart');
var { generateArrayOfPoints: generate } = require('./utils/datagen');

var points = 5;
var circleRadius = 5;
var data, scatterchart;

var CHART_CLASS_NAME  = 'rd3-scatterchart';
var CIRCLE_CLASS_NAME = 'rd3-scatterchart-voronoi-circle';

describe('ScatterChart', function() {

  before(function() {
    // Render a scatterchart
    data = [
      {
        name: "series1",
        values: generate(points)
      },
      {
        name: "series2",
        values: generate(points)
      }
    ];
    scatterchart = TestUtils.renderIntoDocument(
      <ScatterChart
        circleRadius={circleRadius}
        data={data}
        width={400}
        height={200}
      />
    );

  })

  it('renders scatter chart', function() {

    var scatterchartGroup = TestUtils.findRenderedDOMComponentWithClass(
      scatterchart, CHART_CLASS_NAME);
    expect(scatterchartGroup).to.exist;
    expect(scatterchartGroup.tagName).to.equal('g');

  });

  it('renders same amount of circles with data', function() {

    var circles = TestUtils.scryRenderedDOMComponentsWithClass(
      scatterchart, CIRCLE_CLASS_NAME);
    expect(circles).to.have.length(Object.keys(data).length * points);

  });

  // it('each series has unique circle color', function() {

  //   var circles = TestUtils.scryRenderedDOMComponentsWithClass(
  //     scatterchart, CIRCLE_CLASS_NAME);

  //   // uses this naive approach because TestUtils does not have
  //   // something like findRenderedDOMComponentWithProps
  //   var firstCircle = circles[0],
  //       secondCircle = circles[1],
  //       lastCircle = circles[circles.length - 1];

  //   // we know that first and second circle are in same series
  //   expect(ReactDOM.findDOMNode(firstCircle).props.fill).to.equal(secondCircle.props.fill);

  //   // we know that first and last circle are not in same series
  //   expect(ReactDOM.findDOMNode(firstCircle).props.fill).to.not.equal(lastCircle.props.fill);

  // });

  // it('circle animates correctly', function() {

  //     var circle = TestUtils.scryRenderedDOMComponentsWithClass(
  //       scatterchart, CIRCLE_CLASS_NAME)[0];

  //     // Before animation
  //     expect(circle.r.value).to.equal(circleRadius);

  //     // Animation starts with hover
  //     TestUtils.Simulate.mouseOver(circle);
  //     expect(circle.r.value).to.be.above(circleRadius);

  //     // TestUtils.Simulate.mouseOut(circle) is not working here
  //     // https://github.com/facebook/react/issues/1297
  //     // Animation ends with end of hover
  //     TestUtils.SimulateNative.mouseOut(circle);
  //     expect(circle.r.value).to.equal(circleRadius);

  // });

  // it('render tooltip when circle animates', function() {

  //     var circle = TestUtils.scryRenderedDOMComponentsWithClass(
  //       scatterchart, CIRCLE_CLASS_NAME)[0];

  //     // Before animation
  //     expect(scatterchart.state.tooltip.show).to.equal(false);

  //     // Animation starts with hover
  //     TestUtils.Simulate.mouseOver(circle);
  //     expect(scatterchart.state.tooltip.show).to.equal(true);
  // });

});
