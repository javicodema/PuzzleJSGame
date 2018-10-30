class Modelo {

    constructor(imagenRuta, x, y) {
        this.imagen = new Image();
        this.imagen.src = imagenRuta;
        this.x = x;
        this.y = y;
        this.ancho = this.imagen.width;
        this.alto = this.imagen.height;
    }

    estaEnPantalla (){
        if ( (this.x - gameLayer.scrollX) - this.ancho/2 <= 480 &&
            (this.x - gameLayer.scrollX) + this.ancho/2 >= 0 &&
            (this.y - gameLayer.scrollY) - this.alto/2 <= 320 &&
            (this.y - gameLayer.scrollY) + this.alto/2 >= 0 ){
            return true;
        }
        return false;
    }

    tieneDebajo(modelo, rango){
        if ((modelo.x + 20) > this.x && (modelo.x - 20) < this.x &&
            (Math.abs(modelo.y - this.y)) < rango && (modelo.y + 20) > this.y){
            return true;
        }else return false;
    }

    tieneIzq(modelo, rango){
        if ((modelo.y + 20) > this.y && (modelo.y - 20) < this.y &&
            (Math.abs(modelo.x - this.x)) < rango && (modelo.x - 20) < this.x){
            return true;
        }else return false;
    }

    tieneDer(modelo, rango){
        if ((modelo.y + 20) > this.y && (modelo.y - 20) < this.y &&
            (Math.abs(modelo.x - this.x)) < rango && (modelo.x + 20) > this.x){
            return true;
        }else return false;
    }

    dibujar (scrollX,scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        contexto.drawImage(this.imagen,
            this.x - this.imagen.width/2 - scrollX,
            this.y - this.imagen.height/2 - scrollY);
    }


    colisiona (modelo){
        var colisiona = false;

        if ( modelo.x - modelo.ancho/2 <=  this.x + this.ancho/2
            && modelo.x + modelo.ancho/2 >= this.x - this.ancho/2
            && this.y + this.alto/2 >= modelo.y - modelo.alto/2
            && this.y - this.alto/2 <= modelo.y + modelo.alto/2 ){

            colisiona = true;

        }
        return colisiona;
    }

}