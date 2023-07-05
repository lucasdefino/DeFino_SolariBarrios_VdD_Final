function salto() {
    if (document.getElementById("salto").innerHTML === 'España'){
        d3.select('#poligonos').attr('src','poligonos_esp/index.html')
        d3.select('#salto').text('Argentina')
        d3.select('#salto').style('color','#1400FF').style('border-color','#1400FF')
        var css = '.salto:hover{ color: #11001F; background-color: #1400FF;}';
        var style = document.createElement('style');
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    } else if (document.getElementById("salto").innerHTML === 'Argentina') {
        d3.select('#poligonos').attr('src','poligonos_arg/index.html')
        d3.select('#salto').text('España')
        d3.select('#salto').style('color','#d100d1').style('border-color','#d100d1')
        var css = '.salto:hover{background-color: #d100d1;color: #11001F;}';
        var style = document.createElement('style');
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}

function scrollToSection() {
    var sectionElement = document.getElementById("primerStep");
    var offset = sectionElement.offsetTop - 100;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
