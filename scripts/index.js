const width = 1300
const height = 700
const margin = 100
var audio = null

// SCROLLY
let main = d3.select("main");
let scrolly = main.select("#scrolly");
let $figure = scrolly.select("figure");
let wChart = 1200
let hChart = wChart * 0.5;
let dataChart = [];
let $step;


let scroller = scrollama();

init();


function handleStepExit(response) {
  console.count("classed");
  d3.select(response.element).classed("is-active", false);
}

function handleStepEnter(response) {
  $step = d3.select(response.element);
  $step.classed("is-active", true);
  console.count("classed");
  $step.style("background", "transparent");

  // create chart
  const key = $step.attr("data-step");
  createChart(key);
}

function init() {
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.33,
      debug: false,
      progress: true,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
}

function createChart(key) {

  d3.select("#scrolly figure iframe").remove();
  d3.select("#scrolly figure").append('iframe')
  .attr('src','../poligonos_arg/index.html')
  .attr('width','100%')
  .attr('height','700')
  .attr('frameborder','0');
}
