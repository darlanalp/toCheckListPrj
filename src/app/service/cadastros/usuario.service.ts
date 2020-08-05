import { environment } from './../../../environments/environment.prod';
import { Usuario } from './../../componentes/cadastros/Modelos/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, observable, EMPTY, of } from 'rxjs';
import { map, catchError, switchMap, debounceTime, distinctUntilChanged  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private snackBar : MatSnackBar,  private http: HttpClient) { }

  api = environment.baseUrl + "usuarios";

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

      map(obj => obj),
      catchError(e => this.errorHandler(e))

    );
  }

  alterar(usuario : Usuario):Observable<Usuario>{

    const url = `${this.api}/${usuario.id}`
    return this.http.put<Usuario>(url, usuario).pipe(

      map(obj => obj),
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

      map(obj => obj),
      catchError(e => this.errorHandler(e))

    )

  }

  readById(id: number) : Observable<Usuario>{
    //Concatenando a url para realizar o get do produto
    const url = `${this.api}/${id}`
    return this.http.get<Usuario>(url)
  }

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

  errorHandler(e: any): Observable<any>{

    this.showMessage('Erro ao salvar o usuário '+e.message, true);
    return EMPTY
  }

}
