/* Fetch de datos */
d3.json('./data/avengers.json').then(data => {
  console.table(data)
})
