import { Router } from '@angular/router';
import { LoginService } from './../../../service/cadastros/login.service';
import { SidebarService } from './../menu/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public sidebarservice: SidebarService, 
              private loginService : LoginService,
              private router : Router) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
  
  logout(){
    this.loginService.logout();
    this.router.navigate(['/login'])  
  }
}
