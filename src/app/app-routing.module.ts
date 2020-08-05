import { Error404Component } from './componentes/principal/error404/error404.component';
import { AuthGuard } from './service/auth/auth.guard';
import { HomeComponent } from './componentes/template/home/home/home.component';
import { LoginComponent } from './componentes/principal/login/login.component';
import { UsuarioCrudComponent } from './componentes/cadastros/usuario/usuario-crud/usuario-crud.component';
import { UsuarioComponent } from './componentes/cadastros/usuario/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:"home", /*Vazio indica que é a rota raiz*/
    component: HomeComponent/*Indica qual é o componente da rota raiz*/
  },
  {
    path:"login", 
    component: LoginComponent/*Indica qual é o componente da rota*/
  },  
  {
    path:"usuario", 
    component: UsuarioComponent, /*Indica qual é o componente da rota*/
    canActivate: [AuthGuard]
  },
  {
    path:"usuarioCRUD/Novo", 
    component: UsuarioCrudComponent, /*Indica qual é o componente da rota*/
    canActivate: [AuthGuard]
  },
  {
    path:"usuarioCRUD/:id", 
    component: UsuarioCrudComponent, /*Indica qual é o componente da rota*/
    canActivate: [AuthGuard]
  },
  {
    path: '**', component: Error404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
