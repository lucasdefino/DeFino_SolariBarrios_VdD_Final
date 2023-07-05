// SCROLLY
let main = d3.select("main");
let scrolly = main.select("#scrolly");
let $figure = scrolly.select("figure");
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
  d3.select("#scrolly figure img").remove();
  d3.select("#scrolly figure").append('img')
  .attr('src',key)
  .attr('width','100%')
  .attr('height','700px')
  .attr('frameborder','0');

}
