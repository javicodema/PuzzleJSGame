class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador_idle_derecha , x, y)
        this.vidas = 3;
        this.tiempoInvulnerable = 0;

        this.estado = estados.moviendo;
        this.orientacion = orientaciones.derecha;
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY



        // Animaciones

        // No pasar funciones del DIRECTAMNTE COMO callback
        // El objeto que ejecute la función no sabrá interpretar el "this."

        this.aIdleDerecha = new Animacion(imagenes.jugador_idle_derecha,
            this.ancho, this.alto, 6, 1);
        this.aIdleIzquierda = new Animacion(imagenes.jugador_idle_izquierda,
            this.ancho, this.alto, 6, 1);
        this.aCorriendoDerecha =
            new Animacion(imagenes.jugador_corriendo_derecha,
                this.ancho, this.alto, 8, 3);
        this.aCorriendoIzquierda = new Animacion(imagenes.jugador_corriendo_izquierda,
            this.ancho, this.alto, 8, 3, null);

        this.aIdleArriba = new Animacion(imagenes.jugador_idle_arriba,
            this.ancho, this.alto, 6, 1);
        this.aIdleAbajo = new Animacion(imagenes.jugador_idle_abajo,
            this.ancho, this.alto, 6, 1);
        this.aCorriendoArriba =
            new Animacion(imagenes.jugador_corriendo_arriba,
                this.ancho, this.alto, 8, 3);
        this.aCorriendoAbajo = new Animacion(imagenes.jugador_corriendo_abajo,
            this.ancho, this.alto, 8, 3, null);

        this.animacion = this.aIdleDerecha;

    }


    golpeado (){
        if (this.tiempoInvulnerable <= 0) {
            if (this.vidas > 0) {
                this.vidas--;
                this.tiempoInvulnerable = 20;
                // 100 actualizaciones de loop
            }
        }
    }

    actualizar(){

        if (this.tiempoInvulnerable > 0 ){
            this.tiempoInvulnerable--;
        }

        this.animacion.actualizar();


        // Establecer orientación
        if ( this.vx > 0 ){
            this.orientacion = orientaciones.derecha;
        }
        else if ( this.vx < 0 ){
            this.orientacion = orientaciones.izquierda;
        }
        else if ( this.vy > 0 ){
            this.orientacion = orientaciones.abajo;
        }
        else if ( this.vy < 0 ){
            this.orientacion = orientaciones.arriba;
        }

        // Selección de animación
       switch (this.estado){
           case estados.moviendo:
               if ( this.vx != 0 || this.vy!=0 ) {
                   if (this.orientacion == orientaciones.derecha) {
                       this.animacion = this.aCorriendoDerecha;
                   }
                   if (this.orientacion == orientaciones.izquierda) {
                       this.animacion = this.aCorriendoIzquierda;
                   }
                   if (this.orientacion == orientaciones.arriba) {
                       this.animacion = this.aCorriendoArriba;
                   }
                   if (this.orientacion == orientaciones.abajo) {
                       this.animacion = this.aCorriendoAbajo;
                   }
               }
              else if ( this.vx == 0 && this.vy==0){
                   if (this.orientacion == orientaciones.derecha) {
                       this.animacion = this.aIdleDerecha;
                   }
                   if (this.orientacion == orientaciones.izquierda) {
                       this.animacion = this.aIdleIzquierda;
                   }
                   if (this.orientacion == orientaciones.arriba) {
                       this.animacion = this.aIdleArriba;
                   }
                   if (this.orientacion == orientaciones.abajo) {
                       this.animacion = this.aIdleAbajo;
                   }
               }
               break;
       }

    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        if ( this.tiempoInvulnerable > 0) {
            contexto.globalAlpha = 0.5;
            this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
            contexto.globalAlpha = 1;
        } else {
            this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
        }
    }

    moverX (direccion){
        this.vx = direccion * 3;
    }

    moverY (direccion){
        this.vy = direccion * 3;
    }


}