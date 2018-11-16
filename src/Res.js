// Precargado de recursos

// CUIDADO CON EL disparo_jugador
var imagenes = {
    jugador : "res/jugador.png",
    enemigo_movimientoIzq : "res/enemigoMovIzq.png",
    enemigo_movimientoDer : "res/enemigoMovDer.png",
    enemigo_movimientoArr : "res/enemigoMovArr.png",
    enemigo_movimientoAba : "res/enemigoMovAba.png",
    enemigoTirIzq: "res/tiradorIzq.png",
    enemigoTirDer: "res/tiradorDer.png",
    enemigoTirAba: "res/tiradorAba.png",
    enemigo: "res/enemigo.png",
    disparo_jugador : "res/disparo_jugador2.png",
    icono_vidas : "res/corazon.png",
    fondo_2 : "res/fondo1.jpg",
    jugador_idle_derecha : "res/indy_der.png",
    jugador_idle_izquierda : "res/indy_izq.png",
    jugador_corriendo_derecha : "res/indy_derC.png",
    jugador_corriendo_izquierda : "res/indy_izqC.png",
    jugador_idle_arriba : "res/indy_arr.png",
    jugador_idle_abajo : "res/indy_aba.png",
    jugador_corriendo_arriba : "res/indy_arrC.png",
    jugador_corriendo_abajo : "res/indy_abaC.png",
    bloque_tierra : "res/bloque_tierra.png",
    bloque_metal : "res/bloque_metal.png",
    menu_fondo : "res/menu_fondo.png",
    boton_jugar : "res/boton_jugar.png",
    mensaje_como_jugar : "res/mensaje_como_jugar.png",
    mensaje_ganar : "res/mensaje_ganar.png",
    mensaje_perder : "res/mensaje_perder.png",
    objeto0:"res/objeto0.png",
    objeto1:"res/objeto1.png",
    objeto2:"res/objeto2.png",
    inicioQuest1: "res/iniciarQuest1.png",
    finalizarQuest1: "res/finalizarQuest1.png",
    sinQuest1: "res/sinQuest1.png",
    inicioQuest2: "res/inicioQuest2.png",
    finalizarQuest2: "res/finalizarQuest2.png",
    sinQuest2: "res/sinQuest2.png",
    previoQuest2:"res/previoQuest2.png",
    inicioQuest3: "res/inicioQuest3.png",
    finalizarQuest3: "res/finalizarQuest3.png",
    previoQuest3:"res/previoQuest3.png",
    botiquin: "res/botiquin.png",
    door:"res/door.png",
    reina:"res/reina.png",
    ninio:"res/ninio.png",
    senior:"res/senior.png",
    slot:"res/slot.png"
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}