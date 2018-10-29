class EnemigoComun extends Modelo {

    constructor(x, y, vx, vy) {
        super(imagenes.enemigo, x, y);
        this.vxInteligencia = -1;

        this.aMoverIzq = new Animacion(imagenes.enemigo_movimientoIzq,
            this.ancho, this.alto, 6, 5);
        this.aMoverDer = new Animacion(imagenes.enemigo_movimientoDer,
            this.ancho, this.alto, 6, 5);
        this.aMoverArr = new Animacion(imagenes.enemigo_movimientoArr,
            this.ancho, this.alto, 6, 5);
        this.aMoverAba = new Animacion(imagenes.enemigo_movimientoAba,
            this.ancho, this.alto, 6, 5);

        // Ref a la animación actual
        this.animacion = this.aMoverDer;

        this.vy = vy;
        this.vx = vx;
        if (vx != 0) {
            this.ejeX = true;
            this.vxInteligencia = vx;
        }
        else {
            this.ejeX = false;
            this.vxInteligencia = vy;
        }
    }


    actualizar() {
        // Actualizar animación
        this.animacion.actualizar();
        if (this.vx > 0) {
            this.orientacion = orientaciones.derecha;
        }
        else if (this.vx < 0) {
            this.orientacion = orientaciones.izquierda;
        }
        else if (this.vy > 0) {
            this.orientacion = orientaciones.abajo;
        }
        else if (this.vy < 0) {
            this.orientacion = orientaciones.arriba;
        }

        if (this.orientacion == orientaciones.derecha) {
            this.animacion = this.aMoverDer;
        }
        if (this.orientacion == orientaciones.izquierda) {
            this.animacion = this.aMoverIzq;
        }
        if (this.orientacion == orientaciones.arriba) {
            this.animacion = this.aMoverArr;
        }
        if (this.orientacion == orientaciones.abajo) {
            this.animacion = this.aMoverAba;
        }


        if (this.ejeX) {
            if (this.vx == 0) {
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
            }
        } else {
            if (this.vy == 0) {
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vy = this.vxInteligencia;
            }
        }

    }


    dibujar(scrollX, scrollY) {
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }

}