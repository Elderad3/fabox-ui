import { Movimento } from "./movimento.model";


export class MovimentoSerializer {

    resumo(json: any): Movimento {
        const movimento = new Movimento();
        movimento.id = json.id;
       movimento.dataMovimento = json.dataMovimento;
       movimento.produto = json.produto
       movimento.quantidade = json.quantidade
       movimento.custoUnitario = json.custoUnitario
       movimento.custoTotal = json.custoTotal
       movimento.operacao = json.operacao
        return movimento;

    }
}