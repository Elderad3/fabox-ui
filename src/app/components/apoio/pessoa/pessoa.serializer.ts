import { Pessoa } from './pessoa.model';
export class PessoaSerializer {

    resumo(json: any): Pessoa {
        const pessoa = new Pessoa();
        pessoa.id = json.id;
        pessoa.nome = json.nome;
        pessoa.enderecos = json.enderecos;
        return pessoa;
    }


}