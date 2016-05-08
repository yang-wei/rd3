#!/usr/bin/env node

/*
 * react-docgen ../../src/{areachart/AreaChart.jsx,barchart/BarChart.jsx,candlestick/CandlestickChart.jsx,linechart/LineChart.jsx,piechart/PieChart.jsx,scatterchart/ScatterChart.jsx,treemap/Treemap.jsx} | node buildChartProps.js
 */

var json = '';
var path = require('path');
process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    json += chunk;
  }
});

process.stdin.on('end', function() {
  buildDocs(JSON.parse(json));
});

function buildDocs(api) {
  // api is an object keyed by filepath. We use the file name as component name.
  for (var filepath in api) {
  var name = getComponentName(filepath);
  console.log(name);
  generateMarkdownTable(api[filepath].props);
  }
}

function generateMarkdownTable(props) {
  console.log("Name | Type  | Default  | Description");
  console.log("--- | --- | ---- | --- ");
  for (var p in props) {
    var defaultValue = "",
        description = "",
        typeName = "";
    if(props[p].description !== undefined) {
      description = props[p].description
    }
    if(props[p].type !== undefined) {
      var type = props[p].type;
      typeName = type.name;
      if(typeName === "union") {
        typeName = type.value.map(v => v.name).join(",");
      }
      if(typeName === "enum") {
        typeName = type.value.map(v => v.value).join(",<br />");
      }
    }
    if(props[p].defaultValue) {
      defaultValue = "`" + props[p].defaultValue.value + "`";
    }
    console.log(`${p} | ${typeName} | ${defaultValue} | ${description}`);
  }
  console.log("------------- End ----------------")
}

function getComponentName(filepath) {
  var name = path.basename(filepath);
  var ext;
  while ((ext = path.extname(name))) {
    name = name.substring(0, name.length - ext.length);
  }
  return name;
}
