const BandList = require("./band-list");

class Sockets {
    constructor(io) {

        this.io = io
        this.bandList = new BandList();

        this.socketEvents();

    }

    socketEvents() {

        // On conection
        this.io.on('connection', (socket) => {

            console.log('Cliente Conectado');

            //Emitir al cliente todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands());

            //Votar por la banda
            socket.on('votar-banda', (id) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            //Votar por la banda
            socket.on('borrar-banda', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            //cambiar nombre de la banda
            socket.on('cambiar-nombre-banda', ({ id, name }) => {
                this.bandList.changeName(id, name);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            //cambiar nombre de la banda
            socket.on('nueva-banda', ({ name }) => {
                this.bandList.addBand(name);
                this.io.emit('current-bands', this.bandList.getBands());
            });

        });
    }
}

module.exports = Sockets;