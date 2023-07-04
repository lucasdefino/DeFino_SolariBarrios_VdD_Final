d3.csv('top10tracksargyesp.csv', d3.autoType).then(data => {
  
  let chart = Plot.plot({
    width: 500,
    height: 450,
    marginLeft: 50,
    marginRight: -40,
    marginTop: 40,
    marginBottom: 50,
    color: {
      range: ['#1400FF', '#D100D1'],
    },
    marks: [
      Plot.dot(data, {
        y: "enerfloat", 
        x: "dancefloat",
        r: 'popularidad',
        opacity: 0.8,
        fill: 'pais',

      }),
    ],
    r: {range: [0,10]},
    y: {
      label: " energia",
      ticks: [0.5,0.6,0.7,0.8],
      grid: true,
    },
    x: {
      label: "bailabilidad ",
      ticks: [0.5,0.6,0.7,0.8],
      grid: true,
    },
    style: {
      backgroundColor: '#11001F',
      color: '#00FFFF',
    },
    })
  var svg = d3.select('#chart').append(() => chart)
})