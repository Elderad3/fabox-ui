import { EM_CONSTRUCAO } from './ordem-compra-status';
import { OrdemCompraItem } from "./ordem-compra-item";

export class OrdemCompra{
    id: number
    dataCriacao: Date = new Date()
    status: string = EM_CONSTRUCAO
    items: OrdemCompraItem[]
    valorTotal: number = 0
   
}