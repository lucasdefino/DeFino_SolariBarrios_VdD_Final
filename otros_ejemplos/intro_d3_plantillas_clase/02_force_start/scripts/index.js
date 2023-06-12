/* Fetch de datos */
d3.csv('./data/jugadores.csv', d3.autoType).then(data => {

  console.log(data)
  
  // const sim = d3
  //   .forceSimulation(nodos)
  //   .force('manybody', d3.forceManyBody().strength(200))
  //   .force('center', d3.forceCenter())
  //   .force('y', d3.forceY().strength(0.1))
  //   .force(
  //     'collide',
  //     d3
  //       .forceCollide(d => radio(+d.valor) + 1)
  //       .strength(2)
  //       .iterations(5),
  //   )

  })

