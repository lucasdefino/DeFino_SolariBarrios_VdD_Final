d3.csv('top10tracksargyesp.csv', d3.autoType).then(data => {
  
  let maspopulares = data.filter(
    d => d.popularidad >= 92,
  )

  let chart = Plot.plot({
    width: 600,
    height: 400,
    marginLeft: 145,
    color: {
      range: ['#1400FF', '#D100D1'],
    },
    marks: [
      Plot.barX(maspopulares, {
        y: "tema", 
        x: "popularidad",
        fill: 'pais',
        sort: {y: "-x"},
        inset: 5,

      }),
      Plot.text(maspopulares,{
        x: 'popularidad',
        y: 'tema',
        text: 'popularidad',
        textAnchor: "end",
        dx: -10,
        fill: '#00FFFF',
      })
    ],
    
    y: {
      label: null,
      ticks: "",
    },
    x: {
      label: null,
      ticks: "",
    },
    style: {
      backgroundColor: '#11001F',
      color: '#00FFFF',
    },
    })
  var svg = d3.select('#chart').append(() => chart)
})