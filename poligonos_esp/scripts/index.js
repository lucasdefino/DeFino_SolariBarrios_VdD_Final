const width = 1300
const height = 700
const margin = 100
var audio = null

const color = d3.scaleOrdinal()
.domain(['1', '2', '3', '4'])
.range(['#1400FF', '#6A00F4', '#D100D1', '#F20089'])

const radio = d3.scaleRadial().range([40, 100])


d3.csv('./data/top10tracksesp.csv', d3.autoType).then(data => {

  const nodos = data
  
  radio.domain(d3.extent(nodos, d => d.popularidad))
  
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
        .strength(1)
        .iterations(5),
    )

    sim.on('tick', redraw)
    
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
    .append('rect')
    .attr('id','square')
    .attr('width', d => radio(d.popularidad) * 2)
    .attr('height', d => radio(d.popularidad) * 2)
    .attr('x', d => -radio(d.popularidad))
    .attr('y', d => -radio(d.popularidad))
    .style('stroke', 'transparent')
    .style('fill', 'transparent')
    .attr('stroke-width', '2')

  tracks
    .append('path')
    .attr('id','triangle')
    .attr('d', d => {
      const sideLength = radio(d.popularidad) * 2;
      const halfLength = sideLength / 2;
      return `M 0 ${-halfLength} L ${halfLength} ${halfLength} L ${-halfLength} ${halfLength} Z`;
    })
    .style('stroke', 'transparent')
    .style('fill', 'transparent')
    .attr('stroke-width', '2');

  tracks
    .append('path')
    .attr('id','pentagon')
    .attr('d', d => {
      const sideLength = radio(d.popularidad) * 2;
      const angle = (Math.PI * 2) / 5;
      let points = '';
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(i * angle) * sideLength / 2;
        const y = -Math.cos(i * angle) * sideLength / 2;
        points += `${x},${y} `;
      }
      return `M ${points}Z`;
    })
    .style('stroke', 'transparent')
    .style('fill', 'transparent')
    .attr('stroke-width', '2');

  tracks
    .append('path')
    .attr('id','hexagon')
    .attr('d', d => {
      const sideLength = radio(d.popularidad) * 2;
      const angle = (Math.PI * 2) / 6;
      let points = '';
      for (let i = 0; i < 6; i++) {
        const x = Math.sin(i * angle) * sideLength / 2;
        const y = -Math.cos(i * angle) * sideLength / 2;
        points += `${x},${y} `;
      }
      return `M ${points}Z`;
    })
    .style('stroke', 'transparent')
    .style('fill', 'transparent')
    .attr('stroke-width', '2');


  tracks
    .append('circle')
    .attr('id','outer_circle')
    .attr('r', d => radio(d.popularidad))
    .style('stroke', '#00FFFF')
    .style('fill', 'transparent')
    .attr('stroke-width','2')
  
  tracks
    .append('circle')
    .attr('id','inner_circle')
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
        .innerRadius(radius - 25)
        .outerRadius(radius - 25)
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
    .style('font-size', d => {const size = radio(d.popularidad) / 5; return size + 'px'})
    .style('fill', '#00FFFF')
    .text(d => d.tema);

  tracks
    .append('audio')
    .attr('src', d => d.preview)
  
  tracks
    .append('input')
    .attr('type','number')
    .attr('value', d => d.energy)
  
  tracks
    .on("click", function(d) {

      // Check if the element has already been clicked
      var clicked = d3.select(this).classed("clicked");
      
      let x = d3.select(this).select('input').attr('value');
      console.log(x)

      if (x === '1') 
      {
        d3.select(this)
        .select('#triangle')
        .transition()
        .duration(500)
        .style('stroke', clicked ? "transparent" : d => color(d.danceability))
      }
      else if (x === '2')
      {
        d3.select(this)
        .select('#square')
        .transition()
        .duration(500)
        .style('stroke', clicked ? "transparent" : d => color(d.danceability))
      }
      else if (x === '3')
      {
        d3.select(this)
        .select('#pentagon')
        .transition()
        .duration(500)
        .style('stroke', clicked ? "transparent" : d => color(d.danceability))
      }
      else if (x === '4')
      {
        d3.select(this)
        .select('#hexagon')
        .transition()
        .duration(500)
        .style('stroke', clicked ? "transparent" : d => color(d.danceability))
      }      
      
      d3.select(this)
        .select('#inner_circle')
        .transition()
        .duration(500)
        .style('stroke', clicked ? "#00FFFF" : d => color(d.danceability))

      d3.select(this)
        .select('#outer_circle')
        .transition()
        .duration(500)
        .style('stroke', clicked ? "#00FFFF" : "transparent")
        

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
