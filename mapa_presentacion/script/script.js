// Set up the SVG container
const width = 800;
const height = 600;
const svg = d3.select("#map")
  .attr("width", width)
  .attr("height", height);

// Load the GeoJSON data
Promise.all([
  d3.json("./data/spain.geojson"),
  d3.json("./data/argentina.geojson")
]).then(([spainData, argentinaData]) => {
  // Create projection and path generators
  const projection = d3.geoMercator()
    .fitSize([width, height], spainData);
  const path = d3.geoPath().projection(projection);

  // Draw Spain map
  svg.selectAll(".country")
    .data(spainData.features)
    .enter().append("path")
    .attr("class", "country")
    .attr("d", path);

  // Draw Argentina map
  svg.selectAll(".country")
    .data(argentinaData.features)
    .enter().append("path")
    .attr("class", "country")
    .attr("d", path);
});
