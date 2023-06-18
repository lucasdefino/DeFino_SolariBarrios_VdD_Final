const width = 1300
const height = 700
const margin = 100
var audio = null



//hola
// Puesto: escala categorica
const color = d3.scaleOrdinal()
.domain(['1', '2', '3', '4'])
.range(['#1400FF', '#6A00F4', '#D100D1', '#F20089'])

// Escalas lineales: edad y popularidad
//const opacidad = d3.scaleLinear().range([.1, 1])
const radio = d3.scaleRadial().range([30, 100])


/* Fetch de datos */
d3.csv('./data/top10tracksarg.csv', d3.autoType).then(data => {

  const nodos = data

  
  radio.domain(d3.extent(nodos, d => d.popularidad))
  

  /* DOM (cajita) */
  const svg = d3.select('body').append('svg').attr('width', width).attr('height', height)
  const chart = svg
    .append('g')
    .attr('transform', `translate(${[width / 2, height / 2]})`)
  

  const sim = d3
    .forceSimulation(nodos)
    .force('manybody', d3.forceManyBody().strength(200))
    .force('center', d3.forceCenter())
    .force('y', d3.forceY().strength(0.001))
    .force(
      'collide',
      d3
        .forceCollide(d => radio(d.popularidad) + 5)
        .strength(2)
        .iterations(5),
    )
    /* Registra el observer */
    sim.on('tick', redraw)
    
    /* Renderiza los círculos */
    draw(chart, nodos)

    d3.selectAll(".tracks")
      
  })

function draw(chart, nodos) {
  const tracks = chart
    .selectAll('g.tracks')
    .data(nodos)
    .join('g')
    .attr('class', 'tracks')
    .attr('transform', d => `translate(${[d.x, d.y]})`)

  tracks
    .append('circle')
    .attr('r', d => radio(d.popularidad))
    .style('stroke', '#00FFFF')
    .style('fill', 'transparent')
    .attr('stroke-width','2')

  tracks
    .append('circle')
    .attr('r', d => radio(+d.popularidad)/8)
    .style('stroke', '#00FFFF')
    .style('fill', 'transparent')
    .attr('stroke-width','2')

  const textPaths = tracks
    .append('path')
    .attr('id', (d, i) => `text-path-${i}`)
    .attr('d', (d) => {
      const radius = radio(d.popularidad);
      const arc = d3.arc()
        .innerRadius(radius - 20)
        .outerRadius(radius - 20)
        .startAngle(Math.PI * 2)
        .endAngle(-Math.PI * 2)
        .cornerRadius(10); // Optional: Add corner radius to the arc
      return arc();
    
  });

  tracks
    .append('text')
    .append('textPath')
    .attr('xlink:href', (d, i) => `#text-path-${i}`)
    .attr('font-family','Poppins')
    .attr("startOffset", "25%")
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'middle')
    .style('font-size', d => {const size = radio(d.popularidad) / 4; return size + 'px'})
    .style('fill', '#00FFFF')
    .text(d => d.tema);

  tracks
    .append('audio')
    .attr('src', d => d.preview)

    tracks
    .on("click", function(d) {

      // Check if the element has already been clicked
      var clicked = d3.select(this).classed("clicked");

      // Update visual effects
      d3.select(this)
        .selectAll('circle')
        .transition()
        .duration(500)
        .style('stroke', clicked ? "#00FFFF" : d => color(d.danceability))
        

      d3.select(this)
        .select('text')
        .select('textPath')
        .transition()
        .duration(500)
        .style('fill', clicked ? "#00FFFF" : d => color(d.danceability));
      
      // Toggle audio play/pause
      if (audio === null || audio.paused) {
        audio = new Audio(d3.select(this).select('audio').attr('src'));
        audio.play();
      } else {
        audio.pause();
      }

      // Toggle clicked class
      d3.select(this).classed("clicked", !clicked);
  });
}

function redraw() {
  d3.selectAll('.tracks').attr('transform', d => `translate(${[d.x, d.y]})`)
}
