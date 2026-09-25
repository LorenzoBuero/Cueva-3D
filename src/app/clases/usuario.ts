export class Usuario{
    constructor(public email :string, 
                public contrasenia :string,
                public nombre : { nombre :string, apellido :string }
    ){

    }
    
}