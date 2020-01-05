import { Produto } from "../../estoque/produto/produto.model";

export class OrdemCompraItem{
    produto: Produto
    quantidade: number
    custoAtual: number
    custoTotal: number
}