// using d3 for convenience
let main = d3.select("main");
let scrolly = main.select("#scrolly");
let $figure = scrolly.select("figure");
let wChart = 1200
let hChart = wChart * 0.5;
let dataChart = [];
let $step;

// initialize the scrollama
let scroller = scrollama();

// fetch data
d3.csv("./data/top10tracksarg.csv", d3.autoType).then(function (data) {
  dataChart = data;
  // kick things off
  init();
});

function handleStepExit(response) {
  // if ($step) {
  console.count("classed");
  d3.select(response.element).classed("is-active", false);
  // }
}

// scrollama event handlers
function handleStepEnter(response) {

  const nodos = dataChart

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

  /*
  // console.log(response);
  $step = d3.select(response.element);

  // add color to current step only
  // if ($step) {
  $step.classed("is-active", true);
  console.count("classed");
  // }

  $step.style("background", "#ff00002e");

  // create new chart
  const key = $step.attr("data-step");

  // console.log("response.element", response.element);
  // console.log("$step", $step);
  // console.log("key", key);

  createChart(key);
  */
}

function handleStepProgress(response) {
  // console.log(response);
  // $figure.style("opacity", response.progress);
  // $step = d3.select(response.element);
  // console.log($step.attr("data-step"));
  $step.select(".progress").text(d3.format(".1%")(response.progress));
}

function init() {
  // 1. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 2. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.33,
      debug: false,
      progress: true,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    .onStepProgress(handleStepProgress);
}

/* DataViz */
function createChart(key) {
  let chart = Plot.plot({
    width: wChart,
    height: hChart,
    grid: true,
    marginTop: 50,
    marginBottom: 100,
    marginLeft: 50,
    marginRight: 50,
    x: {
      ticks: 10,
      label: key,
      axis: "top",
    },
    marks: [
      Plot.dot(
        dataChart,
        Plot.dodgeY({
          x: key,
          padding: 10,
          r: 15,
          anchor: "middle",
          fill: "puesto",
        })
      ),
      Plot.image(
        dataChart,
        Plot.dodgeY({
          x: key,
          padding: 10,
          r: 15,
          anchor: "middle",
          src: "carita",
          width: 30,
          title: (d) => `${d.nombre}\n${d.edad} años`,
        })
      ),
      Plot.text(
        dataChart,
        Plot.dodgeY({
          x: key,
          padding: 10,
          r: 15,
          dy: 20,
          anchor: "middle",
          text: "apellido",
          width: 30,
        })
      ),
    ],
  });


  d3.select("#scrolly figure svg").remove();
  d3.select("#scrolly figure").append(() => chart);
}

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
