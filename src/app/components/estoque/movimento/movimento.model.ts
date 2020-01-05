import { Operacao } from './operacao';
import { Produto } from '../produto/produto.model';


export class Movimento{
    id: number
    produto: Produto
    dataMovimento: Date
    operacao: Operacao
    quantidade: number = 0 // se for Entrada: Estoque Atual do Produto Aumenta se for saída diminue
    custoUnitario: number = 0 // se for saída tem que pegar o custo unitário atual do produto
    custoTotal: number = 0
}