class BloqueMovil extends Modelo {

    constructor(rutaImagen, x, y) {
        super(rutaImagen, x, y);
        this.vxInteligencia = -1;
        this.vx=-1;

    }

    actualizar (){
        if ( this.vx == 0){
            this.vxInteligencia = this.vxInteligencia * -1;
            this.vx = this.vxInteligencia;
        }
    }

}