var entradas = {}; // tipos
entradas.teclado = 1;
var entrada = entradas.teclado;


var nivelActual = 0;
var objetosMaximos=3;
var totalVidas = 3;

var cuerpo = {};
cuerpo.dinamico = 1;
cuerpo.estatico = 2;

var estados = {};
estados.questAIniciar= 2; // Incluye parado, derecha , izquierda
estados.buscandoObjeto = 3;
estados.objetoEncontrado = 4;
estados.yaFinalizada = 5;
estados.questNoAlcanzada = 6;
estados.juegoFinalizado = 7;

var orientaciones = {};
orientaciones.derecha = 2;
orientaciones.izquierda = 3;
orientaciones.arriba=4;
orientaciones.abajo=5;
