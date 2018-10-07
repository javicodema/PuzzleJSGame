class Recolectable extends Modelo {

    constructor(x, y) {
        super(imagenes.icono_recolectable, x, y)

        this.aM= new Animacion(imagenes.recolectable,
            this.ancho, this.alto, 6, 8);
        // Ref a la animación actual
        this.animacion = this.aM;
    }


    actualizar (){
        // Actualizar animación
        this.animacion.actualizar();
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }

}