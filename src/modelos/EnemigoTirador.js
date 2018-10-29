class EnemigoTirador extends Modelo {

    constructor(imagen, x, y, orientacion) {
        super(imagen , x, y)

        this.orientacion = orientacion;

        // Disparo
        this.cadenciaDisparo = 30;
        this.tiempoDisparo = 0;
    }


    disparar(){
        if ( this.tiempoDisparo == 0) {
            this.tiempoDisparo = this.cadenciaDisparo;

            reproducirEfecto(efectos.disparo);

            var disparo = new Disparo(this.x, this.y);
            if ( this.orientacion == 4 ){
                disparo.vx = disparo.vx*-1; //invertir
            } else if( this.orientacion == 8){
                disparo.vx = 0;
                disparo.vy = -9;
            } else if( this.orientacion == 2 ){
                disparo.vx = 0;
                disparo.vy = 9;
            }
            return disparo;
        } else {
            return null;
        }
    }



    actualizar(){
        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }
    }


}