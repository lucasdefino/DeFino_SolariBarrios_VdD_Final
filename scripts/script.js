function salto_poligono() {
    if (document.getElementById("salto_poligono").innerHTML === 'España'){
        d3.select('#poligonos').attr('src','poligonos_esp/index.html')
        d3.select('#salto_poligono').text('Argentina')
    } else if (document.getElementById("salto_poligono").innerHTML === 'Argentina') {
        d3.select('#poligonos').attr('src','poligonos_arg/index.html')
        d3.select('#salto_poligono').text('España')
    }

}

