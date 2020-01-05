import { PedidoCompraItem } from './pedido-compra-item';
import { EM_ANALISE, REJEITADO, APROVADO, CANCELADO } from './pedido-compra-status';
import { Injectable } from '@angular/core';
import { PedidoCompra } from './pedido-compra.model';

@Injectable({
    providedIn: 'root'
})
export class PedidoCompraGerente {
    constructor() { }

    /**
     * checa se existem produtos com o mesmo ID na lista
     * @returns check: boolean
     * @param item 
     * @param pedidoCompra 
     */
    produtoExistenteNaLista(itemPedidoCompra: PedidoCompraItem, pedidoCompra: PedidoCompra) {
        let check: boolean = false
        for (var i = 0; i < pedidoCompra.items.length; i++) {
            if (pedidoCompra.items[i].produto.id === itemPedidoCompra.produto.id) {
                check = true;
                break;
            }
        }
        return check
    }
   /**
    * calcula custo total dos itens do pedido
    * @returns sum: number
    * @param pedidoCompra 
    */
    calcularCustoTotalItensPedido(pedidoCompra: PedidoCompra) {
        let numbers = pedidoCompra.items.map(i => i.custoTotal)
        var sum = numbers.reduce((a, b) => a + b, 0);
        return sum
    }
    
    /**
      * Envia pedidoCompra para aprovação
      * @param pedidoCompra 
      */
    enviaPedidoCompraParaAprovacao(pedidoCompra: PedidoCompra) {
        pedidoCompra.status = EM_ANALISE
        
    }

    /**
     * Rejeita a PedidoCompra de compra
     * @param PedidoCompra 
     */
    rejeitarPedidoCompra(pedidoCompra: PedidoCompra) {
        pedidoCompra.status = REJEITADO
    }

    /**
     * aprova PedidoCompra de compra
     * @param PedidoCompra 
     */
    aprovarPedidoCompra(pedidoCompra: PedidoCompra) {
        pedidoCompra.status = APROVADO
    }

    /**
     * cancela PedidoCompra de compra
     * @param PedidoCompra 
     */
    cancelarPedidoCompra(pedidoCompra: PedidoCompra) {
        pedidoCompra.status = CANCELADO
    }

}