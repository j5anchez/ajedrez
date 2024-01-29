var tabla1 = document.createElement('table');
tabla1.className = 'tableroAjedrez';
document.addEventListener('DOMContentLoaded', function () {
    for (let i = 0; i < 8; i++) {
        let fila = document.createElement('tr');
        for (let j = 0; j < 8; j++) {
            let celda = document.createElement('td');
            if ((i + j) % 2 === 0) {
                celda.className = 'seraBlanca'
            } else {
                celda.className = 'seraNegra'
            }
            fila.appendChild(celda);
        }
        tabla1.appendChild(fila);
    }
    document.getElementById('contenedorTablero').appendChild(tabla1);
    ocuparTablero();
});
function ocuparTablero() {
    let filas = tabla1.getElementsByTagName('tr');
    colocarPieza(filas[7].getElementsByTagName('td')[0], 'torre', 'blanco');
    colocarPieza(filas[7].getElementsByTagName('td')[1], 'caballo', 'blanco');
    colocarPieza(filas[7].getElementsByTagName('td')[2], 'alfil', 'blanco');
    colocarPieza(filas[7].getElementsByTagName('td')[3], 'reina', 'blanco');
    colocarPieza(filas[7].getElementsByTagName('td')[4], 'rey', 'blanco');
    colocarPieza(filas[7].getElementsByTagName('td')[5], 'alfil', 'blanco');
    colocarPieza(filas[7].getElementsByTagName('td')[6], 'caballo', 'blanco');
    colocarPieza(filas[7].getElementsByTagName('td')[7], 'torre', 'blanco');
    for (var i = 0; i < 8; i++) {
        colocarPieza(filas[6].getElementsByTagName('td')[i], 'peon', 'blanco');
    }
    colocarPieza(filas[0].getElementsByTagName('td')[0], 'torre', 'negro');
    colocarPieza(filas[0].getElementsByTagName('td')[1], 'caballo', 'negro');
    colocarPieza(filas[0].getElementsByTagName('td')[2], 'alfil', 'negro');
    colocarPieza(filas[0].getElementsByTagName('td')[3], 'reina', 'negro');
    colocarPieza(filas[0].getElementsByTagName('td')[4], 'rey', 'negro');
    colocarPieza(filas[0].getElementsByTagName('td')[5], 'alfil', 'negro');
    colocarPieza(filas[0].getElementsByTagName('td')[6], 'caballo', 'negro');
    colocarPieza(filas[0].getElementsByTagName('td')[7], 'torre', 'negro');
    for (var i = 0; i < 8; i++) {
        colocarPieza(filas[1].getElementsByTagName('td')[i], 'peon', 'negro');
    }
    let celdas = tabla1.getElementsByTagName('td');
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].addEventListener('click', function () {
            moverPieza(this);
        });
    }
}
function colocarPieza(celda, pieza, color) {
    celda.setAttribute('data-pieza', pieza);
    celda.setAttribute('data-color', color);
    var imagen = document.createElement('img');
    imagen.src = 'imagenes/' + pieza + '_' + color + '.png';
    imagen.alt = pieza;
    imagen.style.width = '100px';
    imagen.style.height = '100px';
    celda.appendChild(imagen);
}
function moverPieza(celda) {
    let pieza = celda.getAttribute('data-pieza');
    let color = celda.getAttribute('data-color');
    if (pieza && color) {
        let filas = tabla1.getElementsByTagName('tr');
        let indiceFila = celda.parentNode.rowIndex;
        let indiceColumna = celda.cellIndex;
        limpiarResaltado();
        if (pieza == 'peon') {
            if (color == 'negro') {
                if (indiceFila == 1) {
                    resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna]);
                    resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna]);
                } else {
                    resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna]);
                }
            } else if (color == 'blanco') {
                if (indiceFila == 6) {
                    resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna]);
                    resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna]);
                } else {
                    resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna]);
                }
            }
        } else if (pieza == 'torre') {
            for (let i = 0; i < 8; i++) {
                resaltarCelda(filas[indiceFila].getElementsByTagName('td')[i])
                resaltarCelda(filas[i].getElementsByTagName('td')[indiceColumna])
            }
        } else if (pieza == 'alfil') {
            for (let i = 1; i < 8; i++) {
                if (indiceFila - i >= 0 && indiceColumna + i < 8) {
                    resaltarCelda(filas[indiceFila - i].getElementsByTagName('td')[indiceColumna + i]);
                }
                if (indiceFila + i < 8 && indiceColumna + i < 8) {
                    resaltarCelda(filas[indiceFila + i].getElementsByTagName('td')[indiceColumna + i]);
                }
                if (indiceFila + i < 8 && indiceColumna - i >= 0) {
                    resaltarCelda(filas[indiceFila + i].getElementsByTagName('td')[indiceColumna - i]);
                }
                if (indiceFila - i >= 0 && indiceColumna - i >= 0) {
                    resaltarCelda(filas[indiceFila - i].getElementsByTagName('td')[indiceColumna - i]);
                }
            }
        } else if (pieza == 'reina') {
            for (let i = 1; i < 8; i++) {
                resaltarCelda(filas[indiceFila - i] && filas[indiceFila - i].getElementsByTagName('td')[indiceColumna]);
                resaltarCelda(filas[indiceFila + i] && filas[indiceFila + i].getElementsByTagName('td')[indiceColumna]);
                resaltarCelda(filas[indiceFila].getElementsByTagName('td')[indiceColumna - i]);
                resaltarCelda(filas[indiceFila].getElementsByTagName('td')[indiceColumna + i]);
                resaltarCelda(filas[indiceFila - i] && filas[indiceFila - i].getElementsByTagName('td')[indiceColumna + i]);
                resaltarCelda(filas[indiceFila + i] && filas[indiceFila + i].getElementsByTagName('td')[indiceColumna + i]);
                resaltarCelda(filas[indiceFila + i] && filas[indiceFila + i].getElementsByTagName('td')[indiceColumna - i]);
                resaltarCelda(filas[indiceFila - i] && filas[indiceFila - i].getElementsByTagName('td')[indiceColumna - i]);
            }
        } else if (pieza == 'rey') {
            resaltarCelda(filas[indiceFila - 1] && filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna]);
            resaltarCelda(filas[indiceFila + 1] && filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna]);
            resaltarCelda(filas[indiceFila].getElementsByTagName('td')[indiceColumna - 1]);
            resaltarCelda(filas[indiceFila].getElementsByTagName('td')[indiceColumna + 1]);
            resaltarCelda(filas[indiceFila - 1] && filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna + 1]);
            resaltarCelda(filas[indiceFila + 1] && filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna + 1]);
            resaltarCelda(filas[indiceFila + 1] && filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna - 1]);
            resaltarCelda(filas[indiceFila - 1] && filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna - 1]);
        } else if (pieza == 'caballo') {
            if (indiceFila == 7) {
                resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna + 2]);
                resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna - 2]);
                resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna + 1]);
                resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna - 1]);
            }
            if (indiceFila == 6) {
                resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna + 2]);
                resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna - 2]);
                resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna + 1]);
                resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna - 1]);
                resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna - 2]);
                resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna + 2]);
            }
            if (indiceFila == 0) {
                resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna - 2]);
                resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna + 2]);
                resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna - 1]);
                resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna + 1]);
            }
            if (indiceFila == 1) {
                resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna - 2]);
                resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna + 2]);
                resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna - 1]);
                resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna + 1]);
                resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna + 2]);
                resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna - 2]);
            }
            if (indiceColumna == 7) {
                resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna - 1]);
                resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna - 1]);
                resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna - 2]);
                resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna - 2]);
            }
            if (indiceColumna == 6) {
                resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna - 1]);
                resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna - 1]);
                resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna - 2]);
                resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna - 2]);
                resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna + 1]);
                resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna + 1]);
            }
            if (indiceColumna == 0) {
                resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna + 1]);
                resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna + 1]);
                resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna + 2]);
                resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna + 2]);
            }
            if (indiceColumna == 1) {
                resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna + 1]);
                resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna + 1]);
                resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna + 2]);
                resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna + 2]);
                resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna - 1]);
                resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna - 1]);
            }
            if (indiceFila >= 2 && indiceFila <= 5 && indiceColumna >= 2 && indiceColumna <= 5) {
                resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna + 2]);
                resaltarCelda(filas[indiceFila - 1].getElementsByTagName('td')[indiceColumna - 2]);
                resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna + 1]);
                resaltarCelda(filas[indiceFila - 2].getElementsByTagName('td')[indiceColumna - 1]);
                resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna - 2]);
                resaltarCelda(filas[indiceFila + 1].getElementsByTagName('td')[indiceColumna + 2]);
                resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna - 1]);
                resaltarCelda(filas[indiceFila + 2].getElementsByTagName('td')[indiceColumna + 1]);
            }
        }
    }
}
function resaltarCelda(celda) {
    if (celda) {
        celda.style.backgroundColor = 'purple';
    }
}
function limpiarResaltado() {
    let celdas = tabla1.getElementsByTagName('td');
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].style.backgroundColor = '';
    }
}
