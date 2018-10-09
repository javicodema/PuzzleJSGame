class GameLayer extends Layer {

    constructor() {
        super();
        this.mensaje = new Boton(imagenes.mensaje_como_jugar, 480/2, 320/2);
        this.pausa = true;
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();

        this.espacio = new Espacio(0);

        this.scrollX = 0;
        this.scrollY = 0;
        this.bloques = [];
        this.bloqueMoviles=[];
        this.recolectables = [];
        this.fondoPuntos =
            new Fondo(imagenes.icono_puntos, 480*0.85,320*0.05);

        this.puntos = new Texto(0,480*0.9,320*0.07 );

        this.fondoRecol =
            new Fondo(imagenes.icono_recolectable, 480*0.15,320*0.07);

        this.recols = new Texto(0,480*0.2,320*0.07 );

        this.jugador = new Jugador(50, 50);
        this.fondo = new Fondo(imagenes.fondo_2,480*0.5,320*0.5);

        this.enemigos = [];

        this.cargarMapa("res/"+nivelActual+".txt");
    }

    actualizar (){
        if (this.pausa){
            return;
        }

        if ( this.copa.colisiona(this.jugador)){
            nivelActual++;
            if (nivelActual > nivelMaximo){
                nivelActual = 0;
            }
            this.pausa = true;
            this.mensaje =
                new Boton(imagenes.mensaje_ganar, 480/2, 320/2);
            this.iniciar();
        }

        // Jugador se cae
        if ( this.jugador.y > 480 ){
            this.iniciar();
        }

        this.espacio.actualizar();
        this.fondo.vx = -1;
        this.fondo.actualizar();
        this.jugador.actualizar();


        for (var i=0; i < this.bloqueMoviles.length; i++){
            this.bloqueMoviles[i].actualizar(this.scrollX, this.scrollY);
        }


        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }
        for (var i=0; i < this.recolectables.length; i++){
            this.recolectables[i].actualizar();
        }

        // colisiones
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                this.jugador.golpeado();
                if (this.jugador.vidas <= 0){
                    this.iniciar();
                }
            }
        }

        for (var i=0; i < this.recolectables.length; i++){
            if ( this.jugador.colisiona(this.recolectables[i])){
                this.recols.valor++;
                this.espacio
                    .eliminarCuerpoDinamico(this.recolectables[i]);
                this.recolectables.splice(i,1);
            }
        }
    }


    calcularScroll(){
        // limite izquierda
        if ( this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }

        // limite derecha
        if ( this.jugador.x < this.anchoMapa - 480 * 0.3 ) {
            if (this.jugador.x - this.scrollX > 480 * 0.7) {
                this.scrollX = this.jugador.x - 480 * 0.7;
            }
        }

        if ( this.jugador.y > 320 * 0.3) {
            if (this.jugador.y - this.scrollY < 320 * 0.3) {
                this.scrollY = this.jugador.y - 320 * 0.3;
            }
        }

        // limite derecha
        if ( this.jugador.y < this.anchoMapa - 320 * 0.3 ) {
            if (this.jugador.y - this.scrollY > 320 * 0.7) {
                this.scrollY = this.jugador.y - 320 * 0.7;
            }
        }
    }

    dibujar (){
        this.calcularScroll();
        this.fondo.dibujar();
        for (var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i=0; i < this.bloqueMoviles.length; i++){
            this.bloqueMoviles[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i=0; i < this.recolectables.length; i++){
            this.recolectables[i].dibujar(this.scrollX, this.scrollY);
        }
        this.copa.dibujar(this.scrollX, this.scrollY);
        this.jugador.dibujar(this.scrollX,this.scrollY);
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar(this.scrollX, this.scrollY);
        }
        this.fondoPuntos.dibujar();
        this.puntos.dibujar();
        this.fondoRecol.dibujar();
        this.recols.dibujar();
        if ( this.pausa ) {
            this.mensaje.dibujar();
        }
    }




    procesarControles( ){
        if (controles.continuar){
            controles.continuar = false;
            this.pausa = false;
        }

        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);

        }else if ( controles.moverX < 0){
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.moverY(-1);

        } else if ( controles.moverY < 0 ){
            this.jugador.moverY(1);
        } else {
            this.jugador.moverY(0);
        }

    }


    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length-1) * 40;
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40/2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }


    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "X":
                var bloque = new BloqueMovil(imagenes.bloque_metal, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloqueMoviles.push(bloque);
                this.espacio.agregarCuerpoDinamico(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "R":
                var bloque = new Recolectable(x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.recolectables.push(bloque);
                this.espacio.agregarCuerpoDinamico(bloque);
                break;
            case "C":
                this.copa = new Bloque(imagenes.copa, x,y);
                this.copa.y = this.copa.y - this.copa.alto/2;
                // modificación para empezar a contar desde el suelo
                this.espacio.agregarCuerpoDinamico(this.copa);
                break;
            case "E":
                var enemigo = new EnemigoComun(x,y);
                enemigo.y = enemigo.y - enemigo.alto/2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "1":
                this.jugador = new Jugador(x, y);
                // modificación para empezar a contar desde el suelo
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
        }
    }

}