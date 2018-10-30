class GameLayer extends Layer {

    constructor() {
        super();
        this.mensaje = new Boton(imagenes.mensaje_como_jugar, 480 / 2, 320 / 2);
        this.pausa = true;
        //contador de la quest en la que estamos
        this.quest = 0;
        //contador de objetos encontrados
        this.objetos=0;
        this.iniciar();
        this.objetoAlmacenado = null;
        this.totalVidas = 3;
    }

    iniciar() {
        reproducirMusica();
        switch (nivelActual){
            case 0:
                this.imgIni = imagenes.inicioQuest1;
                this.imgFin = imagenes.finalizarQuest1;
                this.imgSin = imagenes.sinQuest1;
                this.imgNpc = imagenes.senior;
                break;
            case 1:
                this.imgIni = imagenes.inicioQuest2;
                this.imgFin = imagenes.finalizarQuest2;
                this.imgSin = imagenes.sinQuest2;
                this.imgPre = imagenes.previoQuest2;
                this.imgNpc = imagenes.ninio;
                break;
            case 2:
                this.imgIni = imagenes.inicioQuest3;
                this.imgFin = imagenes.finalizarQuest3;
                this.imgPre = imagenes.previoQuest3;
                this.imgNpc = imagenes.reina;
                break;
        }
        this.espacio = new Espacio(0);

        this.scrollX = 0;
        this.scrollY = 0;
        this.bloques = [];
        this.bloqueMoviles = [];
        this.jugador = new Jugador(50, 50);

        this.npcQuest = null;
        this.fondo = new Fondo(imagenes.fondo_2, 480 * 0.5, 320 * 0.5);
        this.fondovidas = new Fondo(imagenes.icono_vidas, 480 * (0.15), 320 * 0.07);
        this.vidas = new Texto(0, 480 * 0.22, 320 * 0.1);
        this.enemigos = [];
        this.enemigosTiradores = [];
        this.disparos = [];
        this.puertas = [];
        this.botiquines = [];
        this.objeto=null;
        this.tiempoHablando = 0;
        this.cargarMapa("res/" + nivelActual + ".txt");
        this.jugador.vidas = totalVidas;
    }

    actualizar() {
        if (this.pausa) {
            return;
        }
        this.tiempoHablando++;
        this.vidas.valor=(this.jugador.vidas-1);
        this.espacio.actualizar();
        this.fondo.actualizar();
        this.jugador.actualizar();
        for (var i = 0; i < this.bloqueMoviles.length; i++) {
            this.bloqueMoviles[i].actualizar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].actualizar();
        }
        for (var i = 0; i < this.enemigosTiradores.length; i++) {
            this.enemigosTiradores[i].actualizar();
        }
        for (var i = 0; i < this.disparos.length; i++) {
            this.disparos[i].actualizar();
        }

        for (var i = 0; i < this.enemigosTiradores.length; i++) {
            switch(this.enemigosTiradores[i].orientacion){
                case 2:
                    if (this.enemigosTiradores[i].tieneDebajo(this.jugador,150)) {
                        var disparo = this.enemigosTiradores[i].disparar();
                        if (disparo != null) {
                            this.disparos.push(disparo);
                            this.espacio.agregarCuerpoDinamico(disparo);
                        }
                    }
                    break;
                case 4:
                    if (this.enemigosTiradores[i].tieneIzq(this.jugador,150)) {
                        var disparo = this.enemigosTiradores[i].disparar();
                        if (disparo != null) {
                            this.disparos.push(disparo);
                            this.espacio.agregarCuerpoDinamico(disparo);
                        }
                    }
                    break;
                case 6:
                    if (this.enemigosTiradores[i].tieneDer(this.jugador,150)) {
                        var disparo = this.enemigosTiradores[i].disparar();
                        if (disparo != null) {
                            this.disparos.push(disparo);
                            this.espacio.agregarCuerpoDinamico(disparo);
                        }
                    }
                    break;
            }
        }

        if (this.npcQuest!=null&&this.npcQuest.tieneDebajo(this.jugador,60)&&this.tiempoHablando>30) {
            switch(this.estadoQuest()){
                case estados.buscandoObjeto:
                    this.conversacion(this.imgIni);
                    break;
                case estados.questNoAlcanzada:
                    this.conversacion(this.imgPre);
                    break;
                case estados.yaFinalizada:
                    this.conversacion(this.imgSin);
                    break;
                case estados.questAIniciar:
                    this.conversacion(this.imgIni);
                    this.quest++;
                    break;
                case estados.objetoEncontrado:
                    this.conversacion(this.imgFin);
                    this.objetoAlmacenado=null;
                    break;
                case estados.juegoFinalizado:
                    this.conversacion(this.imgFin);
                    this.objetoAlmacenado=null;
                    this.quest = 0;
                    this.objetos=0;
                    this.iniciar();
                    break;
            }
        }


        if (this.objeto!= null) {
            if (this.objeto.colisiona(this.jugador) && this.quest==this.objeto.misionNumber) {
                this.objetos++;
                this.espacio.eliminarCuerpoDinamico(this.objeto);
                this.objetoAlmacenado=this.objeto;
                this.objeto=null;
            }
        }

        // colisiones
        for (var i = 0; i < this.enemigos.length; i++) {
            if (this.jugador.colisiona(this.enemigos[i])) {
                this.espacio
                    .eliminarCuerpoDinamico(this.disparos[i]);
                this.disparos.splice(i, 1);
                this.jugador.golpeado();
                if (this.jugador.vidas <= 0) {
                    totalVidas = 3;
                    this.iniciar();
                }
            }
        }
        // Eliminar disparos sin velocidad
        for (var i = 0; i < this.disparos.length; i++) {
            if (this.disparos[i] != null &&
                (this.disparos[i].vx == 0 && this.disparos[i].vy == 0)) {
                this.espacio
                    .eliminarCuerpoDinamico(this.disparos[i]);
                this.disparos.splice(i, 1);
            }
        }
        // Eliminar disparos fuera de pantalla
        for (var i = 0; i < this.disparos.length; i++) {
            if (this.disparos[i] != null &&
                !this.disparos[i].estaEnPantalla()) {
                this.espacio
                    .eliminarCuerpoDinamico(this.disparos[i]);
                this.disparos.splice(i, 1);
            }
        }

        for (var i = 0; i < this.disparos.length; i++) {
            if (this.disparos[i] != null &&
                this.jugador != null &&
                this.jugador.colisiona(this.disparos[i])) {
                this.jugador.golpeado();
                if (this.jugador.vidas <= 0) {
                    totalVidas=3;
                    this.iniciar();
                }
            }
            for (var j = 0; j < this.enemigos.length; j++){
                if (this.disparos[i] != null &&
                    this.enemigos[j] != null &&
                    this.enemigos[j].colisiona(this.disparos[i])) {
                    this.espacio
                        .eliminarCuerpoDinamico(this.disparos[i]);
                    this.disparos.splice(i, 1);
                    this.espacio
                        .eliminarCuerpoDinamico(this.enemigos[j]);
                    this.enemigos.splice(j,1);
                }
            }
        }

        for (var i = 0; i < this.puertas.length; i++) {
            if (this.puertas[i].colisiona(this.jugador)) {
                nivelActual = this.puertas[i].nivel;
                totalVidas=this.jugador.vidas;
                this.iniciar();
            }
        }

        for (var i = 0; i < this.botiquines.length; i++) {
            if (this.jugador.colisiona(this.botiquines[i])) {
                this.espacio
                    .eliminarCuerpoDinamico(this.botiquines[i]);
                this.botiquines.splice(i, 1);
                this.jugador.vidas=3;
            }
        }
    }

    conversacion(rutaImg){
        this.pausa = true;
        this.mensaje =
            new Boton(rutaImg, 480 / 2, 320 / 2);
        this.tiempoHablando=0;
    }

    calcularScroll() {
        // limite izquierda
        if (this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }

        // limite derecha
        if (this.jugador.x < this.anchoMapa - 480 * 0.3) {
            if (this.jugador.x - this.scrollX > 480 * 0.7) {
                this.scrollX = this.jugador.x - 480 * 0.7;
            }
        }

        if (this.jugador.y > 320 * 0.3) {
            if (this.jugador.y - this.scrollY < 320 * 0.3) {
                this.scrollY = this.jugador.y - 320 * 0.3;
            }
        }
        if (this.jugador.y < this.anchoMapa - 320 * 0.3) {
            if (this.jugador.y - this.scrollY > 320 * 0.7) {
                this.scrollY = this.jugador.y - 320 * 0.7;
            }
        }
    }

    dibujar() {
        this.calcularScroll();
        this.fondo.dibujar();

        for (var i = 0; i < this.disparos.length; i++) {
            this.disparos[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.bloques.length; i++) {
            this.bloques[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.bloqueMoviles.length; i++) {
            this.bloqueMoviles[i].dibujar(this.scrollX, this.scrollY);
        }
        this.jugador.dibujar(this.scrollX, this.scrollY);
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.enemigosTiradores.length; i++) {
            this.enemigosTiradores[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.botiquines.length; i++) {
            this.botiquines[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.puertas.length; i++) {
            this.puertas[i].dibujar(this.scrollX, this.scrollY);
        }
        this.fondovidas.dibujar();
        this.vidas.dibujar();
        this.npcQuest.dibujar();
        if (this.objeto != null) this.objeto.dibujar(this.scrollX, this.scrollY);
        if (this.pausa) {
            this.mensaje.dibujar();
        }
    }


    procesarControles() {
        if (controles.continuar) {
            controles.continuar = false;
            this.pausa = false;
        }

        // Eje X
        if (controles.moverX > 0) {
            this.jugador.moverX(1);

        } else if (controles.moverX < 0) {
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if (controles.moverY > 0) {
            this.jugador.moverY(-1);

        } else if (controles.moverY < 0) {
            this.jugador.moverY(1);
        } else {
            this.jugador.moverY(0);
        }

    }

    estadoQuest(){
        if(nivelActual==(this.quest-1)&&nivelActual==(this.objetos-1)&&this.objetoAlmacenado!=null&&this.objetos==
            objetosMaximos){
            return estados.juegoFinalizado;
        }else if(nivelActual==(this.quest-1)&&nivelActual==(this.objetos-1)&&this.objetoAlmacenado!=null) {
            return estados.objetoEncontrado;
        }else if(this.objetoAlmacenado==null&&nivelActual==this.quest&&nivelActual==(this.objetos)){
            return estados.questAIniciar;
        }else if(nivelActual<=(this.quest-1)&&nivelActual<=(this.objetos-1)){
            return estados.yaFinalizada;
        } else if(nivelActual==(this.quest-1)&&nivelActual==(this.objetos)&&this.objetoAlmacenado==null){
            return estados.buscandoObjeto;
        } else{
            return estados.questNoAlcanzada;
        }
    }


    cargarMapa(ruta) {
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length - 1) * 40;
            for (var i = 0; i < lineas.length; i++) {
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++) {
                    var simbolo = linea[j];
                    var x = 40 / 2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo, x, y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }


    cargarObjetoMapa(simbolo, x, y) {
        switch (simbolo) {
            case "X":
                var bloque = new BloqueMovil(imagenes.bloque_metal, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bloqueMoviles.push(bloque);
                this.espacio.agregarCuerpoDinamico(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "E":
                var enemigo = new EnemigoComun(x, y, 1, 0);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "e":
                var enemigo = new EnemigoComun(x, y, 0, 1);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "1":
                this.jugador = new Jugador(x, y);
                // modificación para empezar a contar desde el suelo
                this.jugador.y = this.jugador.y - this.jugador.alto / 2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "2":
                var enemigo = new EnemigoTirador(imagenes.enemigoTirAba,x, y, 2);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.enemigosTiradores.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "4":
                var enemigo = new EnemigoTirador(imagenes.enemigoTirIzq,x, y, 4);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.enemigosTiradores.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "6":
                var enemigo = new EnemigoTirador(imagenes.enemigoTirDer,x, y, 6);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.enemigosTiradores.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "|":
                var puerta = new Puerta(imagenes.door, x, y,0);
                puerta.y = puerta.y - puerta.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.puertas.push(puerta);
                this.espacio.agregarCuerpoDinamico(puerta);
                break;
            case "@":
                var puerta = new Puerta(imagenes.door, x, y,1);
                puerta.y = puerta.y - puerta.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.puertas.push(puerta);
                this.espacio.agregarCuerpoDinamico(puerta);
                break;
            case "~":
                var puerta = new Puerta(imagenes.door, x, y,2);
                puerta.y = puerta.y - puerta.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.puertas.push(puerta);
                this.espacio.agregarCuerpoDinamico(puerta);
                break;
            case "N":
                this.npcQuest = new Bloque(this.imgNpc, x, y);
                this.npcQuest.y = this.npcQuest.y - this.npcQuest.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(this.npcQuest);
                this.espacio.agregarCuerpoEstatico(this.npcQuest);
                break;
            case "O":
                if(this.objetos<1){
                    this.objeto = new ObjetoQuest(imagenes.objeto1, x, y, 1);
                    this.objeto.y = this.objeto.y - this.objeto.alto / 2;
                    // modificación para empezar a contar desde el suelo
                    this.espacio.agregarCuerpoDinamico(this.objeto);
                }
                break;
            case "o":
                if(this.objetos<2) {
                    this.objeto = new ObjetoQuest(imagenes.objeto0, x, y, 2);
                    this.objeto.y = this.objeto.y - this.objeto.alto / 2;
                    // modificación para empezar a contar desde el suelo
                    this.espacio.agregarCuerpoDinamico(this.objeto);
                }
                break;
            case "0":
                if(this.objetos<3) {
                    this.objeto = new ObjetoQuest(imagenes.objeto2, x, y, 3);
                    this.objeto.y = this.objeto.y - this.objeto.alto / 2;
                    // modificación para empezar a contar desde el suelo
                    this.espacio.agregarCuerpoDinamico(this.objeto);
                }
                break;
            case "B":
                var botiquin = new Bloque(imagenes.botiquin, x, y);
                botiquin.y = botiquin.y - botiquin.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.botiquines.push(botiquin);
                this.espacio.agregarCuerpoDinamico(botiquin);
                break;
        }
    }

}