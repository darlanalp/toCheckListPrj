import { environment } from './../../../environments/environment.prod';
import { Usuario } from './../../componentes/cadastros/Modelos/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, observable, EMPTY, of, empty } from 'rxjs';
import { map, catchError, switchMap, debounceTime, distinctUntilChanged  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private snackBar : MatSnackBar,  private http: HttpClient) { }

  api = environment.baseUrl + "usuarios";

  public usuarioEdicao : Usuario;
  filtroCarreado: Usuario[];

  viewFiltroCarregado() : Observable<Usuario[]>{

    return new Observable<Usuario[]>(observador => {
      observador.next(this.filtroCarreado)      
    });
    
  }
  
  addFiltroCarregado(u : Usuario){
    if(this.filtroCarreado!= null)
    {    
      //Se achou remove
      var indice = this.filtroCarreado.findIndex(obj => obj.id == u.id);
      if(indice >= 0)
         this.filtroCarreado.splice(indice, 1);

      //Adiciona o atualizado
      this.filtroCarreado.push(u);
    }
  }

  
  removeFiltroCarregado(id:number){
    if(this.filtroCarreado!= null)
    {    
      //Se achou remove
      var indice = this.filtroCarreado.findIndex(obj => obj.id == id);
      if(indice >= 0)
         this.filtroCarreado.splice(indice, 1);
    }
  }
  showMessage(msg: string, isError: boolean= false): void{

    //Configuração e apresentação do snackBar do pacote do material
    this.snackBar.open(msg,'X',{
      duration: 3000, //Tempo de duração
      horizontalPosition: "end", //Posição horizontal
      verticalPosition: "bottom", //Posição vertical
      panelClass: isError ? ['msg-erro'] :['msg-success']
    })
  }

  incluir(usuario:Usuario) : Observable<Usuario>{

    return this.http.post<Usuario>(this.api,usuario).pipe(

      map(obj => {
        this.addFiltroCarregado(obj);
        return obj;
      }),
      catchError(e => this.errorHandler(e))

      
    );
  }

  alterar(usuario : Usuario):Observable<Usuario>{

    const url = `${this.api}/${usuario.id}`
    return this.http.put<Usuario>(url, usuario).pipe(

      map(obj => {
          this.addFiltroCarregado(obj);
          return  obj;
      }),
      catchError(e => this.errorHandler(e))

    )    
  }

  readView() : Observable<Usuario[]>{

    //Exemplo de requisição utilizando o metodo get

    return this.http.get<Usuario[]>(this.api).pipe(

      map(obj => obj),
      catchError(e => this.errorHandler(e))

    ); // retorna um observable de usuario
  }

  delete(id: number) : Observable<Usuario>{

    //Concatenando a url para realizar o get do produto
    const url = `${this.api}/${id}`
    return this.http.delete<Usuario>(url).pipe(

      map(obj => { 
        this.removeFiltroCarregado(id);
        return obj
      }),
      catchError(e => this.errorHandler(e))

    )

  }

  readById(id: number) : Observable<Usuario>{
    //Concatenando a url para realizar o get do produto
    const url = `${this.api}/${id}`
    return this.http.get<Usuario>(url)
  }

  pesquisaPorCampo(campo:string, informacao : string) : Observable<Usuario[]>{
      
    //_like=^ => consulta considerando que comece com
    const url = `${this.api}?${campo}_like=${informacao}`

    return this.http.get<Usuario[]>(url).pipe(

      map(obj => obj),
      catchError(e => this.errorHandler(e))

    ); // retorna um observable de usuario
 }

/*
   pesquisaPorCampo(terms, campo:string) : Observable<Usuario[]>{
     console.log(terms);
     console.log(campo);
     
    return terms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => {
          //_like=^ => consulta considerando que comece com
          const url = `${this.api}?${campo}_like=${term}`
          console.log(url);
          return this.http.get(url);
      }),
      catchError((error: any) => {
           console.error(error);
           return of();
      }),
    );
  }
*/
  errorHandler(e: any): Observable<any>{

    this.showMessage('Erro ao salvar o usuário '+e.message, true);
    return EMPTY
  }

}
