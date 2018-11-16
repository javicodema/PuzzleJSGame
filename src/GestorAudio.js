
var musicaAmbiente = new Audio("res/Root.mp3");
musicaAmbiente.loop = true;

var efectos = {
    disparo : "res/efecto_disparo.mp3",
}

function reproducirMusica() {
    musicaAmbiente.play();
}

function pararMusica() {
    musicaAmbiente.stop();
}

function reproducirEfecto( srcEfecto ) {
    var efecto = new Audio( srcEfecto );
    efecto.play();
}