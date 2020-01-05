import { Atributo } from './atributo.model';
export class AtributoSerializer {

    resumo(json: any): Atributo {
        const atributo = new Atributo();
        atributo.id = json.id;
        atributo.nome = json.nome;
        atributo.mascara = json.mascara
        atributo.esquema = json.esquema;
        atributo.tabela = json.tabela;
        atributo.mascaraTitulo = json.mascaraTitulo;
        return atributo;
    }
}