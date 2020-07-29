import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'Principal',
      type: 'header'
    },
    {
      title: 'Cadastros',
      icon: 'fa fa-id-card',
      active: false,
      type: 'dropdown',
      
      submenus: [
        {
          title: 'Dashboard 1',
        },
        {
          title: 'Dashboard 2'
        },
        {
          title: 'Dashboard 3'
        }
      ]
    },
    {
      title: 'CheckList',
      icon: 'fa fa-check-circle',
      active: false,
      type: 'dropdown',     
      submenus: [
        {
          title: 'Products',
        },
        {
          title: 'Orders'
        },
        {
          title: 'Credit cart'
        }
      ]
    },
    {
      title: 'Usuários',
      icon: 'far fa-user',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Cadastro',
          rota:  '/usuario'
        },
        {
          title: 'Panels'
        },
        {
          title: 'Tables'
        },
        {
          title: 'Icons'
        },
        {
          title: 'Forms'
        }
      ]
    },    
    {
      title: 'Consultas',
      type: 'header'
    },
    {
      title: '[Consulta]',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
      badge: {
        text: 'Beta',
        class: 'badge-primary'
      },
    },
    {
      title: '[Consulta]',
      icon: 'fa fa-calendar',
      active: false,
      type: 'simple'
    },
    {
      title: '[Consulta]',
      icon: 'fa fa-folder',
      active: false,
      type: 'simple'
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
