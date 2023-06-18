const width = 800; // Set the desired width of the map
const height = 600; // Set the desired height of the map

const svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("./data/mapamundi.geojson").then(function (data) {
    // Code to handle the loaded data goes here
});

const projection = d3.geoNaturalEarth1()
  .scale(width / (2 * Math.PI))
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

svg.selectAll("path")
  .data(data.features)
  .enter()
  .append("path")
  .attr("d", path);
