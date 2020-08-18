import { UsuarioService } from './../../../../service/cadastros/usuario.service';
import { Usuario } from './../../Modelos/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectedPositionStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-usuario-crud',
  templateUrl: './usuario-crud.component.html',
  styleUrls: ['./usuario-crud.component.css']
})
export class UsuarioCrudComponent implements OnInit {

  formUsuario: FormGroup;
  isError : boolean;
  submitted  = false;

  usuario : Usuario = {
    primeiroNome : '',
    sobreNome: '',
    funcao:'',
    usuario:'',
    genero:0,
    dataNascimento: undefined,
    observacao: '',
    inativo: false,
    senha:''
  }

  Novo = false;

  constructor(private formBuilder: FormBuilder, 
              private router : Router, 
              private snackBar : MatSnackBar,
              private usuarioService : UsuarioService,
              private route : ActivatedRoute ) { }

              

            
  ngOnInit(): void {

    this.createForm(this.usuario);

    const id = +this.route.snapshot.paramMap.get('id')
    
    if(id == null || id == 0){

       this.Novo = true;   
       this.usuarioService.usuarioEdicao = null;
    }
    else{

        this.usuarioService.readById(id).subscribe( usuario => {
        this.usuario = usuario;     
        this.Novo = false;
        this.usuarioService.usuarioEdicao = usuario;
      })      
      
    }


    


  }
  
  createForm(usuario: Usuario) {
    /*
    Definir as regras dos campos , ver exemplo do crud
    */

    this.formUsuario = this.formBuilder.group({
      usuario: [usuario.usuario, [Validators.required, Validators.minLength(6)] ],
      primeiroNome: [usuario.primeiroNome, [Validators.required]],
      sobreNome: [usuario.sobreNome,[Validators.required]],      
      genero: [usuario.genero,[Validators.required]],
      funcao: [usuario.funcao,[Validators.required]],
      dataNascimento: [usuario.dataNascimento, [ Validators.required]],
      observacao: [usuario.observacao],
      inativo: [usuario.inativo],
      senha: [usuario.senha,[Validators.required, Validators.minLength(6)]]
    })

   
  }

  incluiUsuario():void{

    this.usuarioService.incluir(this.usuario).subscribe( ()=>{

      this.usuarioService.showMessage("Usuário cadastrado com sucesso!")
      this.router.navigate(['/usuario']);
    });
    
  }
  
  AlterarUsuario():void{

    this.usuarioService.alterar(this.usuario).subscribe( () => {

      this.usuarioService.showMessage('Usuário com sucesso')
      this.router.navigate(['/usuario'])

    })
    
  }


  // Encapsula os controles para fácil acesso ao form
  get f() { return this.formUsuario.controls; }



  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.formUsuario.invalid) 
    {
      if(this.f.primeiroNome.errors.required)
      {
        var elemento = document.getElementById("idprimeiroNome");     
        elemento.focus();         
      }

      return;
    }

    if(this.Novo)
      this.incluiUsuario();
    else
      this.AlterarUsuario();
 }
 
 cancel():void{
    
  this.router.navigate(["/usuario"])
 }

}
