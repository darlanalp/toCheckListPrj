import { campo } from './../Modelos/pesquisa.model';
import { UsuarioDatasource } from './usuario-datasource';
import { Usuario } from './../Modelos/usuario.model';
import { UsuarioService } from './../../../service/cadastros/usuario.service';
import { Component, OnInit, TemplateRef,  ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, AfterViewInit {

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
  public informacaoPesquisar : string;

  public mesageErroPesquisa : string;

  constructor(private modalService: BsModalService,
              private usuarioService : UsuarioService,
              private route : ActivatedRoute ){ 
                

  }

  public showErroInfoPesquisar():boolean{
    return !(this.mesageErroPesquisa == '' || this.mesageErroPesquisa == undefined);
  }
  

  pesquisar():void{   
    this.pesquisarRegistro(this.pesquisaControl.value, this.informacaoPesquisar);              
  }

  pesquisarRegistro(campo:string, informacao:string):void{
   
    if(campo == undefined || campo == ''){
         
      this.mesageErroPesquisa = 'Selecione por qual informação deseja pesquisar ';
      return;
    }

    if(informacao == undefined || informacao == ''){

      this.mesageErroPesquisa = 'Preencha alguma informação para ser pesquisada';      
      this.someInput.nativeElement.focus();
      return;
    }

    
    this.usuarioService.pesquisaPorCampo(campo, informacao)
    .subscribe(data => {

      this.mesageErroPesquisa = '';

       this.refreshData(data);   
       this.usuarioService.filtroCarreado = data;

       if(data.length == 0)
          this.mesageErroPesquisa = 'Não foi encontrado nenhum registro com a informação pesquisada!';
    });
              
  }

  public setaCampoPesquisar(campo : campo): any {

    this.someInput.nativeElement.focus();
  }

  public refreshData(data : Usuario[]){
       
    this.dataSource = new UsuarioDatasource(data); 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;    
    this.dataLength = data.length;         
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
      this.refreshData(this.usuarioService.filtroCarreado);      
    })    
  }


  ngOnInit(): void {

 
  }

  ngAfterViewInit():void{
        
    if(this.usuarioService.filtroCarreado != null){

      this.usuarioService.viewFiltroCarregado()
      .subscribe(usuariosFiltro => {
      
        this.refreshData(usuariosFiltro);  
       });         
    }
            
  }

  displayedColumns =  Usuario.DisplayedPropriedadeColumns();    

}
