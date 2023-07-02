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

// initialize the scrollama
let scroller = scrollama();

 // fetch data
init();


function handleStepExit(response) {
  // if ($step) {
  console.count("classed");
  d3.select(response.element).classed("is-active", false);
  // }
}

// scrollama event handlers
function handleStepEnter(response) {
  // console.log(response);
  $step = d3.select(response.element);

  // add color to current step only
  // if ($step) {
  $step.classed("is-active", true);
  console.count("classed");
  // }

  $step.style("background", "transparent");

  // create new chart
  const key = $step.attr("data-step");

  // console.log("response.element", response.element);
  // console.log("$step", $step);
  // console.log("key", key);

  createChart(key);


}

// function handleStepProgress(response) {
//   // console.log(response);
//   // $figure.style("opacity", response.progress);
//   // $step = d3.select(response.element);
//   // console.log($step.attr("data-step"));
//   $step.select(".progress").text(d3.format(".1%")(response.progress));
// }

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
    //.onStepProgress(handleStepProgress);
}

function createChart(key) {

  d3.select("#scrolly figure iframe").remove();
  d3.select("#scrolly figure").append('iframe')
  .attr('src','../poligonos_arg/index.html')
  .attr('width','100%')
  .attr('height','700')
  .attr('frameborder','0');
}
