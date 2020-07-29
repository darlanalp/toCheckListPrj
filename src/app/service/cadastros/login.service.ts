import { User } from './../../componentes/principal/login/user.model';
 
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*
Exemplo de login pegar do 
https://stackblitz.com/edit/angular-8-registration-login-example?file=app%2Fapp.component.html
*/

export class LoginService {

  showModal = false;

  UserTeste: User[] = [
    {userName: "darlanalp", senha: "123456",  nome: 'Darlan'},
    {userName: "Alinealp", senha: "123456",  nome: 'Aline'},
  ];

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {     
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
      
    this.currentUser = null;
    var achouUser = this.UserTeste.find( userItem => userItem.userName == username && 
                                                     userItem.senha == password);
    if(achouUser)
    {
      localStorage.setItem('currentUser', JSON.stringify(achouUser));
      this.currentUserSubject.next(achouUser);
      this.hide();  
    }
    else
    {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);  
    }
    return  this.currentUserSubject;
  }

  logout() {
       // remove user from local storage to log user out
       localStorage.removeItem('currentUser');
       this.currentUserSubject.next(null);
  }

  getShowModal(){
    return this.showModal;
  }


  show(){
    this.showModal = true; // Show-Hide Modal Check    
  }

  //Bootstrap Modal Close event
  hide(){
      this.showModal = false;
  }
  

}
