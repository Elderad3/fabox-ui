import { Produto } from './produto.model';

export class ProdutoSerializer {

    resumo(json: any): Produto {
        const produto = new Produto();
        produto.id = json.id;
        produto.sku = json.sku;
        produto.nome = json.nome;
        produto.estoqueAtual = json.estoqueAtual;
        produto.custoUnitarioAtual = json.custoUnitarioAtual
        produto.custoTotalAtual = json.custoTotalAtual
        produto.isAtivo = json.isAtivo
        produto.isBloqueado = json.isBloqueado
        return produto;

    }
}