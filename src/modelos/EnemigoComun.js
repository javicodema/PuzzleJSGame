class EnemigoComun extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo, x, y);
        this.vxInteligencia = -1;
        this.vx = this.vxInteligencia;

        this.aMover = new Animacion(imagenes.enemigo_movimiento,
            this.ancho, this.alto, 6, 3);

        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vy = 0;
        this.vx = 1;
    }


    actualizar() {
        // Actualizar animación
        this.animacion.actualizar();
        if ( this.vx == 0){
            this.vxInteligencia = this.vxInteligencia * -1;
            this.vx = this.vxInteligencia;
        }
    }


    dibujar(scrollX, scrollY) {
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }

}