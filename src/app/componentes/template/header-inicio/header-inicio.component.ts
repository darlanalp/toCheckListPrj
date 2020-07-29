import { LoginService } from './../../../service/cadastros/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-inicio',
  templateUrl: './header-inicio.component.html',
  styleUrls: ['./header-inicio.component.scss']
})
export class HeaderInicioComponent implements OnInit {

  constructor(private loginService : LoginService,
              private router : Router) { }

  ngOnInit(): void {
  }

  show() {
    this.loginService.show();  
    this.router.navigate(['/login'])  
  }

  hide() {
    this.loginService.hide();
  }

}
