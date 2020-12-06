class Usuarios{

    constructor(){
        this.personas=[];
    }



    AgregarPersona(id,nombre,sala){
        let persona={id,nombre,sala}
        this.personas.push(persona);
        return this.personas;
    }

    
    GetPersonaID(id){
        let persona=this.personas.filter(persona=>{
            return persona.id===id
        })[0]

        return persona
    }

    GetPersonas(){
        return this.personas;
    }

    BorrarPersona(id){
        let PersonaBorrada=this.GetPersonaID(id);

        this.personas=this.personas.filter(persona=>{
            return persona.id!=id
        })
      return PersonaBorrada;
    }

getPersonaSala(sala){
let personas_sala=this.personas.filter(persona=>{
return persona.sala===sala;
})
return personas_sala;
}

}





module.exports={
    Usuarios
};