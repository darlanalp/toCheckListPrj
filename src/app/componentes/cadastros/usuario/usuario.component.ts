import { campo } from './../Modelos/pesquisa.model';
import { UsuarioDatasource } from './usuario-datasource';
import { Usuario } from './../Modelos/usuario.model';
import { UsuarioService } from './../../../service/cadastros/usuario.service';
import { Component, OnInit, TemplateRef,  ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {map, startWith} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  modalRef: BsModalRef;
  messageConfirmacaoExclusao: string;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Usuario>;
  @ViewChild('inputPesquisa') someInput: ElementRef;
  
  

  dataSource: UsuarioDatasource; 
  public dataLength: number;
  
  public camposPesquisa  = Usuario.DisplayedColumnsCaption();
  public pesquisaControl = new FormControl('');
  public pesquisaTerm$ = new Subject<string>();

  constructor(private modalService: BsModalService,
              private usuarioService : UsuarioService,
              private route : ActivatedRoute ){ 
                

  }

  

  public setaCampoPesquisar(campo : campo): any {

    this.usuarioService.pesquisaPorCampo(this.pesquisaTerm$, this.pesquisaControl.value)
    .subscribe(data => {

       this.dataLength = data.length;
       this.dataSource = new UsuarioDatasource(data); 
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
       this.table.dataSource = this.dataSource;  
       
       console.log(data);
    });

    this.someInput.nativeElement.focus();
  }




  idUsuarioExcluir  : number;

  confirmaExclusao(template: TemplateRef<any>, usuario : Usuario) {

    this.messageConfirmacaoExclusao = 'Usuário(a): '+ usuario.primeiroNome+' '+usuario.sobreNome;
    this.idUsuarioExcluir = usuario.id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


  confirm(): void {
    
    this.deleteUsuario();
    this.modalRef.hide();
  }
 
  decline(): void {
  
    this.modalRef.hide();
  }

  
  deleteUsuario(): void{

    this.usuarioService.delete(this.idUsuarioExcluir).subscribe( () => {

      this.usuarioService.showMessage('Usuário excluido com sucesso')
      this.readVisao();
    })
    
  }

  readVisao() : void{

    //Carrega as informações cadastradas
    this.usuarioService.readView().subscribe( usuarios =>{

    this.dataSource = new UsuarioDatasource(usuarios); 

        //Faz o binding com os componentes da table
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;      
      
    })

  }

  ngOnInit(): void {

    this.readVisao();


  }

  displayedColumns =  Usuario.DisplayedPropriedadeColumns();
    


}
