import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { campo } from './pesquisa.model';
import { strict } from 'assert';

export class Usuario{
  id?:number;
  usuario:string;
  primeiroNome: string ;
  sobreNome: string ;
  funcao?: string ;
  senha: string ;
  genero: number;
  dataNascimento?: Date ;
  observacao?: string ;
  inativo: boolean;
  
  static DisplayedPropriedadeColumns(): string[] {
  
    return ["primeiroNome", "sobreNome", "funcao","dataNascimento","usuario","inativo","action"];
  }

  static DisplayedColumnsCaption(): campo[] {
  
    var campos: campo[] = [];   
    campos.push(new campo("primeiroNome", "Nome"));
    campos.push(new campo("sobreNome", "Sobrenome"));
    campos.push(new campo("funcao", "Função"));
    campos.push(new campo("dataNascimento", "Data nascimento"));
    campos.push(new campo("usuario", "Usuário"));
    return campos;
    
  }
  
}
