d3.csv('./data/jugadores.csv', d3.autoType).then(data => {
  // console.table(data)

  /* Seleccion container */
  const container = d3.select('#chart_container')

  /* Atamos la data a elementos del DOM */
  const jugadores = container.selectAll('div')
    .data(data)
    .join('div')
    .attr('class', d => 'jugador_card ' + d.puesto)
    
    const bio = jugadores.append('div')
    .attr('class', 'jugador_bio')
    
    bio.append('h3')
      .attr('class', 'jugador_nombre')
      .text(d => d.nombre)

    bio.append('p')
    .attr('class', 'jugador_edad')
    .text(d => d.edad)
    .append('span')
    .text(' años')
    
    bio.append('p')
      .attr('class', 'jugador_nac')
      .text(d => d.lugar)

    bio.append('p')
      .attr('class', 'jugador_nac')
      .text(d => d.nacimiento)

  jugadores.append('img')
    .attr('class', 'jugador_img')
    .attr('src', d => './imagenes/' + d.archivo + '.jpg')


  console.log((container))

})
