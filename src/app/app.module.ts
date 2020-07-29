import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppBootstrapModule } from './app.bootstrap-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './componentes/template/header/header.component';
import { SidebarComponent } from './componentes/template/menu/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Module utilizado para criação do componente de menu
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderInicioComponent } from './componentes/template/header-inicio/header-inicio.component';
import { FooterComponent } from './componentes/template/footer/footer.component';
import { LoginComponent } from './componentes/principal/login/login.component';

import { from } from 'rxjs';
import { UsuarioComponent } from './componentes/cadastros/usuario/usuario.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { UsuarioCrudComponent } from './componentes/cadastros/usuario/usuario-crud/usuario-crud.component';
import { NavComponent } from './componentes/template/navegacao/nav/nav.component';


//Material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule, MatCard } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';


import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './componentes/template/home/home/home.component';

//Usuário
import { AuthGuard } from './service/auth/auth.guard';
import { Error404Component } from './componentes/principal/error404/error404.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HeaderInicioComponent,
    FooterComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioCrudComponent,
    NavComponent,
    HomeComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppBootstrapModule,
    PerfectScrollbarModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    HttpClientModule,
  ],
  providers: [ {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
