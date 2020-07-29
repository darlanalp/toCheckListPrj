import { LoginService } from './service/cadastros/login.service';

import { User } from './componentes/principal/login/user.model';
import { Component } from '@angular/core';
import { SidebarService } from './componentes/template/menu/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'toCheckListPrj';
  currentUser: User;

  constructor(public sidebarservice: SidebarService, private loginService : LoginService) {

    this.loginService.currentUser.subscribe(x => this.currentUser = x);
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


}
