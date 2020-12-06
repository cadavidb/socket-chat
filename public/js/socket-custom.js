var socket = io();
var params= new URLSearchParams(window.location.search);
if(!params.has('nombre') || !params.has('sala')){
    window.location='index.html';
    throw new Error('el nombre y sala son  necesarios')

}

var usuario={
    nombre:params.get('nombre'),
    sala:params.get('sala')
}
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat',usuario,(data)=>{
        console.log('usuarios conectados');
        data.forEach(e => {
            console.log(e);
        });

    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/*
socket.emit('crearMensaje', {
    usuario: 'Brayan cadavid',
    mensaje: 'Hola mundo de programadores'
}, function(resp) {
    console.log('respuesta server: ', resp);
});
*/

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//escuchar cuando un usuario entra y sale del chat
socket.on('listaPersona', function(personas) {

    console.log('Servidor:', personas);

});

socket.on('mensajePrivado',function(mensaje){
    console.log('mensaje privado : ' + mensaje.mensaje);
})
