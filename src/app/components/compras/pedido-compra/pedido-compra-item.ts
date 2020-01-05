import { Produto } from "../../estoque/produto/produto.model";

export class PedidoCompraItem{
    produto: Produto
    quantidade: number
    custoAtual: number
    custoTotal: number
}