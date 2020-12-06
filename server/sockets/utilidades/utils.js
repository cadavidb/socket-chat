const crearMensaje=(nombre,mensaje)=>{

    return {
        nombre,
        mensaje,
        fecha: {
            dia: new Date().getDay(),
            hora: new Date().getUTCHours()
        }
    }

}

module.exports={
    crearMensaje
}