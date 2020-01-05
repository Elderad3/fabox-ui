import { Injectable } from '@angular/core';
import { Produto } from './produto.model';
import { Movimento } from '../movimento/movimento.model';

@Injectable({
    providedIn: 'root'
})
export class ProdutoGerente {

    constructor() { }
    /**
        * Ativa o Produto
        * @param produto 
        */
    ativarProduto(produto: Produto) {
        produto.isAtivo = 'Sim'
        return produto
    }

    /**
        * Desativa o Produto
        * @param produto 
        */
    desativarProduto(produto: Produto) {
        produto.isAtivo = 'Não'
        return produto
    }
    /**
     * Verifica se o produto pode ser Excluído
     * @param produto 
     */
    validarExclusao(produto: Produto) {
        if (produto.isAtivo == 'Não') { return false }
        return true
    }

    /**
      * Atualiza propriedades do produto depois de realizado @Movimento no estoque
      * @param movimento 
      */
    atualizarMovimentoProduto(movimento: Movimento): Produto {
        if (movimento.operacao.valor == "E") {
            return this.atualizarProdutoMovimentoEntrada(movimento)
        }
        if (movimento.operacao.valor == "S") {
            return this.atualizarProdutoMovimentoSaida(movimento)
        }
    }

    /**
     * Atualiza o produto se o movimento for de entrada
     * @param movimento 
     */
    atualizarProdutoMovimentoEntrada(movimento: Movimento): Produto {
        let produto = new Produto()
        produto = movimento.produto
        produto.estoqueAtual += movimento.quantidade
        produto.custoTotalAtual += movimento.custoTotal
        produto.custoUnitarioAtual = produto.custoTotalAtual / produto.estoqueAtual
        return produto
    }

    /**
      * Atualiza o produto se o movimento for Saída
      * @param movimento 
      */
    atualizarProdutoMovimentoSaida(movimento: Movimento): Produto {
        let produto: Produto
        produto = new Produto
        produto = movimento.produto
        produto.custoTotalAtual -= movimento.custoTotal
        produto.estoqueAtual -= movimento.quantidade
        produto.custoUnitarioAtual = (produto.custoTotalAtual / produto.estoqueAtual)
        produto.custoUnitarioAtual = this.transformaNaNEmZero(produto.custoTotalAtual)
        return produto
    }

    /**
     * Transforma valor NaN(Not a Number) em Zero
     * @param valor 
     */
    transformaNaNEmZero(valor) {
        return isNaN(valor) ? 0 : valor;
    }
}