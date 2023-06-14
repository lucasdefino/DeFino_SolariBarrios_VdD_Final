const width = 1300
const height = 700
const margin = 100
const audio = new Audio('https://p.scdn.co/mp3-preview/5bbdd15509b10d1b62cf5aa43500255754e2096b?cid=0b297fa8a249464ba34f5861d4140e58');



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
    d3.selectAll(".tracks")
      .on("click", function(){
          d3.select(this)
          .selectAll('circle').transition().duration(500).style('stroke', (d, i) => color(d.danceability));

          d3.select(this)
          .select('text').select('textPath').transition().duration(500).style('fill', (d, i) => color(d.danceability));

          audio.play();
          
          // Get current event info
          console.log(d3.event);
          
          // Get x & y co-ordinates
          console.log(d3.mouse(this));
      })
      .on("mouseout", function(){
          audio.pause();
      //     d3.select(this)
      //     .select('circle').style('stroke', '#00FFFF');
          
      //     d3.select(this)
      //     .select('text').style('fill', '#00FFFF');
      })
      
      
          

      

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
    .style('stroke', '#00FFFF')
    .style('fill', 'transparent')
    .attr('stroke-width','2')
    //.style('fill-opacity', d => opacidad(d.edad))

    tracks
    .append('circle')
    .attr('r', d => radio(+d.popularidad)/8)
    .style('stroke', '#00FFFF')
    .style('fill', 'transparent')
    .attr('stroke-width','2')
    //.style('fill-opacity', d => opacidad(d.edad))


  tracks
    .append("path")
    .attr("id", "wavy") //Unique id of the path
    .attr("d", d => {
      const diametro = radio(+d.popularidad)*2
      const size = radio(+d.popularidad)
      return "M" + (-size+10) + ',0 A' + (size/4) + ',' + (size/4) + " 0 0,0 " + (size-10) + ",0"
    })
    //.attr("d", "M-80,0 A50,50 0 0,0 80,0") //SVG path
    //.attr("d", "M-30,0 A5,5 0 0,0 30,0")
    .style("fill", "none")
    .style("stroke", "#00FFFF");

  
  tracks
    .append('text')
    .append("textPath")
    .attr("xlink:href", "#wavy")
    .attr('text-anchor', 'middle')
    .attr("startOffset", "50%")
    .text(d => d.tema)
    .attr('dy', d => (radio(+d.popularidad))*10)
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
