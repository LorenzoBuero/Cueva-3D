import { Component, inject } from '@angular/core';
import { AbstractControl, 
  FormBuilder, 
  ValidationErrors, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { endWith } from 'rxjs';
import { MenuPrincipal } from '../../cliente/menu-principal/menu-principal';
import { EColorOjos } from '@app/clases/EColorOjos';
import { EGrupoSanguineo } from '@app/clases/EGrupoSanguineo';
import { Cliente } from '@app/clases/cliente';
import { SupabaseService } from '@app/servicios/supabase';

@Component({
  imports: [RouterLink, 
    ReactiveFormsModule
  ],
  selector: 'app-registrarse',
  styleUrl: './registrarse.css',
  templateUrl: './registrarse.html',
})
export class Registrarse {

  public cliente : Cliente | null = null;
  public readonly gruposSanguineos :string[] = Object.values(EGrupoSanguineo);
  public readonly coloresOjos :string[] = Object.values(EColorOjos);

  private cargando :boolean = false;

  private fb = inject(FormBuilder)
  constructor(
    private readonly supabase: SupabaseService
  ){}

  
  formulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],


    contrasenia: ['', [Validators.required, 
        Validators.minLength(4),
        Validators.maxLength(60),
        this.verificarValidezContrasenia]],

    contraseniaRepetida: ['', [Validators.required]],


    nombre: ['', [Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(30),
        this.verificarValidezNombre]],//validar 

    apellido: ['', [Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(30),
        this.verificarValidezNombre]],//validar nombre realista (sin numeros ni caracteres que no sean letras excepto ('), (-), ( ))
    

    fechaNacimiento: ['', [Validators.required]],//validar fecha fisicamente posible


    grupoSanguineo: ['', []],
    colorOjos: ['', []],
    vacacionesAnuales: ['', [Validators.min(0), 
        Validators.max(365)]]
  }, 
  {
    validators: [this.validarIgualdadContrasenias]
  })
  

  
  esCampoInvalido(nombreCampo: string): boolean{
    const campo = this.formulario.get(nombreCampo);
    return !!(campo && campo.invalid && (campo.dirty || campo.touched))
  }
  
  
  async guardar() : Promise<void>{
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }
    
    console.log("datos a enviar: " + this.formulario.value)

    let email :string= this.formulario.get('email')?.value as string;
    let contrasenia :string= this.formulario.get('contrasenia')?.value as string;
    let nombre = {nombre: this.formulario.get('nombre')?.value as string,
                  apellido: this.formulario.get('apellido')?.value as string}
    let fecha :Date= this.formulario.get('fechaNacimiento')?.value as Date;
    let grupoSanguineo :EGrupoSanguineo= this.formulario.get('grupoSanguineo')?.value as EGrupoSanguineo;
    let colorOjos :EColorOjos= this.formulario.get('colorOjos')?.value as EColorOjos;
    let cantidadVacaciones :number= this.formulario.get('vacacinesAnuales')?.value as number;

    
    this.cliente = new Cliente(email, contrasenia, nombre, fecha, grupoSanguineo, colorOjos, cantidadVacaciones);
  
    try {
      this.cargando = true
      
      const { error } = await this.supabase.registrarse(email, contrasenia);
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    } finally {
      this.formulario.reset()
      this.cargando = false
    }
  }



  
  verificarValidezContrasenia(control: AbstractControl) :ValidationErrors | null{
    const contraseniaIngresada :string = control.value as string;
      
    if(contraseniaIngresada && contraseniaIngresada?.includes(" ")){
      return { contraseniaInvalida : true}
    }
    return null

  }
  
  verificarValidezNombre(control: AbstractControl) :ValidationErrors | null{
    const nombreIngresado :string = control.value as string;
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü'-]+$/;

    if(nombreIngresado && !regex.test(nombreIngresado)){
      return {nombreInvalido : true}
    }
    return null
  }
  
  validarIgualdadContrasenias(control: AbstractControl) : ValidationErrors | null{

      const contra :string = control.get('contrasenia')?.value as string;
      const contraRep = control.get('contraseniaRepetida')?.value as string;

      if(contra && contraRep && !(contra === contraRep)){
        return { contraseniaRepetidaEsDistinta : true }
      }
    

    return null
  }
  
  obtenerMensajesError(nombresControlesFormulario :string[]){

    let retorno :string[] = [];

    for(let nombreControl of nombresControlesFormulario){
      const control = this.formulario.get(nombreControl);
      if(control?.hasError("required")){
        retorno.push("Este campo es obligatorio, debe ser llenado.");
      }
      if(control?.hasError("email")){
        retorno.push("Ingrese un correo electrónico válido.");
      }
      if(control?.hasError("contraseniaInvalida")){
        retorno.push("La contraseña no puede contener espacios vacios.");
      }
      if(control?.hasError('nombreInvalido')){
        retorno.push("El nombre no es valido, solo puede contener letras, (-) y (').");
      }
      if(control?.hasError("minlength")){
        let texto = "";

        if(nombreControl == "contrasenia"){
          texto += "La contraseña";
        } else {
          texto += "El " + nombreControl;
        }

        texto += " debe contener al menos " + control.getError('minlength')?.requiredLength as string + " caracteres."

        retorno.push(texto);
      }
      if(control?.hasError("maxlength")){
        let texto = "";

        if(nombreControl == "contrasenia"){
          texto += "La contraseña";
        } else {
          texto += "El" + nombreControl;
        }

        texto += "no puede contener más de " + control.getError('maxlength')?.requiredLength as string + " caracteres."

        retorno.push(texto);
      }
      if(control?.hasError("min")){
        let texto = "";

        texto += "El numero no puede ser menor a " + control.getError('min')?.min as string + "."

        retorno.push(texto);
      }
      if(control?.hasError("max")){
        let texto = "";

        texto += "El numero no puede ser mayor a " + control.getError('max')?.max as string + "."

        retorno.push(texto);
      }
      if(this.formulario?.hasError('contraseniaRepetidaEsDistinta') && nombreControl === "contraseniaRepetida"){
      
        retorno.push("Ambas contraseñas ingresadas deben ser exactamente iguales.");
      }

    }

    return retorno;
  }
}
