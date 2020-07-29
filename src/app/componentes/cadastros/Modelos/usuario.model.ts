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
 
  
}
