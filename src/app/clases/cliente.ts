import { EColorOjos } from "./EColorOjos";
import { EGrupoSanguineo } from "./EGrupoSanguineo";
import { Usuario } from "./usuario";

export class Cliente extends Usuario{

    constructor(email :string, 
            contrasenia :string,
            nombre : { nombre :string, apellido :string },
            public fechaNacimiento :Date,
            public grupoSanguineo :EGrupoSanguineo | null,
            public colorOjos :EColorOjos | null,
            public numeroVacaciones :number | null
            ){
        super(email, contrasenia, nombre);
    }




}