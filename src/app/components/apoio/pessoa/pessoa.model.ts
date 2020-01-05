import { Endereco } from './endereco.model';
import { GenericId } from 'src/app/core/generic-id';

export class Pessoa extends GenericId{
    nome: string;
   // email: string;
   // telefone: string;
   /// cnpj: string;
   // dataCadastro: Date = new Date();
    enderecos: Endereco[] = []

}