import { EM_RECEBIMENTO, RECEBIDO, ENV_FORNECEDOR } from './ordem-compra-status';
import { OrdemCompraItem } from './ordem-compra-item';
import { Injectable } from '@angular/core';
import { OrdemCompra } from './ordem-compra.model';

@Injectable({
    providedIn: 'root'
})
export class OrdemCompraGerente {
    constructor() { }

    /**
     * checa se existem produtos com o mesmo ID na lista
     * @returns check: boolean
     * @param item 
     * @param ordemCompra 
     */
    produtoExistenteNaLista(itemOrdemCompra: OrdemCompraItem, ordemCompra: OrdemCompra) {
        let check: boolean = false
        for (var i = 0; i < ordemCompra.items.length; i++) {
            if (ordemCompra.items[i].produto.id === itemOrdemCompra.produto.id) {
                check = true;
                break;
            }
        }
        return check
    }
   /**
    * calcula custo total dos itens do ordem
    * @returns sum: number
    * @param ordemCompra 
    */
    calcularCustoTotalItensOrdem(ordemCompra: OrdemCompra) {
        let numbers = ordemCompra.items.map(i => i.custoTotal)
        var sum = numbers.reduce((a, b) => a + b, 0);
        return sum
    }
    /**
      * Inicia recebimento da ordem de compra
      * @param ordemCompra 
      */
     enviarParaFornecedor(ordemCompra: OrdemCompra) {
        ordemCompra.status = ENV_FORNECEDOR
    }
    
    /**
      * Inicia recebimento da ordem de compra
      * @param ordemCompra 
      */
    iniciarRecebimento(ordemCompra: OrdemCompra) {
        ordemCompra.status = EM_RECEBIMENTO
    }

    /**
     * finaliza o recebimento
     * @param OrdemCompra 
     */
    finalizarRecebimento(ordemCompra: OrdemCompra) {
        ordemCompra.status = RECEBIDO
    }

    validarExclusao(ordem: OrdemCompra): boolean{
        if(
        ordem.status === "Em Construção"){
            return true
        } return false
    }

}