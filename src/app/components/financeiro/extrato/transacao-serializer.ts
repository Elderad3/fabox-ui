import { Transacao } from './transacao.model';

export class TransacaoSerializer {

    resumo(json: any): Transacao {
        const transacao = new Transacao();
        transacao.id = json.id;
        transacao.conta = json.conta;
        transacao.codigo = json.codigo;
        transacao.data = json.data;
        transacao.valor = json.valor;
        transacao.categoria = json.categoria
        transacao.descricao = json.descricao
        return transacao;

        // codigo: string
        // tipo: string
        // data: Date
        // categoria: Categoria
        // isAtivo: string
        // valor: number
        // descricao: string

    }
}