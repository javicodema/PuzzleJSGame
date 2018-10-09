var entradas = {}; // tipos
entradas.teclado = 1;
var entrada = entradas.teclado;


var nivelActual = 0;
var nivelMaximo = 2;

var cuerpo = {};
cuerpo.dinamico = 1;
cuerpo.estatico = 2;

var estados = {};
estados.moviendo= 2; // Incluye parado, derecha , izquierda
estados.saltando = 3;
estados.muriendo = 4;
estados.muerto = 5;
estados.disparando = 6;
estados.impactado = 7;

var orientaciones = {};
orientaciones.derecha = 2;
orientaciones.izquierda = 3;
orientaciones.arriba=4;
orientaciones.abajo=5;
