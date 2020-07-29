import { LoginService } from './../../../service/cadastros/login.service';
import { element } from 'protractor';
import { User } from './user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  
  UserTeste: User[] = [
    {userName: "darlanalp", senha: "123456",  nome: 'Darlan'},
    {userName: "Alinealp", senha: "123456",  nome: 'Aline'},
  ];

  user : User;

  submitted = false;
  showError = false;
  returnUrl: string;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private loginService : LoginService,
              private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
     });

     var elemento = document.getElementById("idUsuario");     
     elemento.focus();   
     
  }

  showModal(){
  
    if(this.registerForm.value['usuario'] == "" ||
       this.registerForm.value['usuario'] == null){           
      var elemento = document.getElementById("idUsuario");     
      elemento.focus();   
    }  
    

    return this.loginService.getShowModal();
   
  }

 

  // Encapsula os controles para fácil acesso ao form
  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
   }
    

   this.loginService.login(this.registerForm.value['usuario'], 
                           this.registerForm.value['password']).subscribe( user => {

    this.user = user;
    if(!user)
    {
      this.showError = true;     
    }
    else
      this.router.navigate(['/home'])  


   })


   

   

  }

}
