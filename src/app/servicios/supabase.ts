/*import { Service } from '@angular/core';

@Service()
export class Supabase {}*/
import { Injectable } from '@angular/core'
import { AuthChangeEvent, createClient, Session, SupabaseClient, User } from '@supabase/supabase-js'
import { datosDB } from '../../environments/environment'


@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(datosDB.supabaseUrl, datosDB.supabasePublishableKey)
  }


  iniciarSesion(email: string, contrasenia: string) {
    return this.supabase.auth.signInWithPassword({ email, password: contrasenia });
  }

  registrarse(email: string, contrasenia: string) {
    return this.supabase.auth.signUp({ email, password: contrasenia });
  }

  cerrarSesion() {
    return this.supabase.auth.signOut()
  }

  getUsuario(){
    return this.supabase.auth.getUser();
  }
  getUsuarios(){
    return this.supabase.auth.admin.listUsers();
  }
}
