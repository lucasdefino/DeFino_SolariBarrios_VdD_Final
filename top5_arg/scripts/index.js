const width = 1300
const height = 700
const margin = 100

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

  /*
  // Dominios escalas
  opacidad.domain(d3.extent(nodos, d => d.edad))
  */
  radio.domain(d3.extent(nodos, d => +d.popularidad))
  

  /* DOM (cajiat) */
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
        .forceCollide(d => radio(+d.popularidad) + 5)
        .strength(2)
        .iterations(5),
    )
    /* Registra el observer */
    sim.on('tick', redraw)
    
    /* Renderiza los círculos */
    draw(chart, nodos)
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
    .attr('r', d => radio(+d.popularidad))
    .style('stroke', (d, i) => color(d.danceability))
    .style('fill', 'transparent')
    .attr('stroke-width','2')
    //.style('fill-opacity', d => opacidad(d.edad))
  
  tracks
    .append('text')
    .text(d => d.tema)
    .attr('y', d => radio(+d.popularidad) / 9)
    .attr('text-anchor', 'middle')
    .style('fill','#00FFFF')
    .attr('font-family','Poppins')
    .attr('font-size', d => {
      const size = radio(+d.popularidad) / 4
      return size + 'px'
    })
  
}

function redraw() {
  d3.selectAll('.tracks').attr('transform', d => `translate(${[d.x, d.y]})`)
}
