const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios');
const {crearMensaje}= require('./utilidades/utils');
const usuarios=new Usuarios();
io.on('connection', (client) => {

    console.log('Usuario conectado');
    client.on('entrarChat',(usuario,callback)=>{
     if (!usuario.nombre || !usuario.sala ) {
         return callback({
             error:true,
             mensaje:'el nombre/sala es necesario'
         })
     }
    
     client.join(usuario.sala)

    let personas= usuarios.AgregarPersona(client.id,usuario.nombre,usuario.sala)
    client.broadcast.to(usuario.sala).emit('listaPersona',usuarios.getPersonaSala(usuario.sala))
    callback(personas)

    
    })

    client.on('crearMensaje',(data)=>{
        let persona=usuarios.GetPersonaID(client.id)
        let mensaje=crearMensaje(data.nombre,data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)

    })

    client.on('disconnect',()=>{
       let personaBorrada= usuarios.BorrarPersona(client.id);
       client.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('Administrador',`${personaBorrada} salio`))
       client.broadcast.to(personaBorrada.sala).emit('listaPersona',usuarios.getPersonaSala(personaBorrada.sala))
    })




    client.on('mensajePrivado',data=>{
        let persona= usuarios.GetPersonaID(client.id)
        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje))
    })
});

