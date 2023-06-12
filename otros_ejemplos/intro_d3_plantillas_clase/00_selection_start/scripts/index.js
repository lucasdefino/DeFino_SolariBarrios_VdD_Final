d3.csv('./data/jugadores.csv', d3.autoType).then(data => {
  console.table(data)
})
