import { EM_CONSTRUCAO } from "./pedido-compra-status";
import { PedidoCompraItem } from "./pedido-compra-item";

export class PedidoCompra{
    id: number
    dataCriacao: Date = new Date()
    status: string = EM_CONSTRUCAO
    items: PedidoCompraItem[]
    valorTotal: number = 0
   
}