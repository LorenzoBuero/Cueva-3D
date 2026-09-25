import { Route, Routes } from '@angular/router';
import { EstadoLogueo } from './servicios/usuarios/estado-logueo';
import { inject } from '@angular/core';
import { LandingPage } from './componentes/inicios-sesion/landing-page/landing-page';
import { Error } from './componentes/error/error';
import { Registrarse } from './componentes/inicios-sesion/registrarse/registrarse';
import { IniciarSesion } from './componentes/inicios-sesion/iniciar-sesion/iniciar-sesion';
import { DashboardAdmin } from './componentes/admin/dashboard-admin/dashboard-admin';
import { MenuPrincipal } from './componentes/cliente/menu-principal/menu-principal';


export const routes: Routes = [
    {
        path: "",
        redirectTo: "inicio",
        pathMatch: 'full'
    },
    {
        path: "inicio",
        component: LandingPage
    },
    {
        path: "registrarse",
        component: Registrarse
    },
    {
        path: "iniciar-sesion",
        component: IniciarSesion
    },
    {
        path: "menu-principal",
        component: MenuPrincipal
    },
    {
        path: "dashboard-admin",
        component: DashboardAdmin
    },
    {
        path: "**",
        component: Error

    }

];
