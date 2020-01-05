export class Produto {
    id: number;
    dataCadastro: Date = new Date();
    isAtivo: string
    isBloqueado: string
    sku: string;
    nome: string
    unidadeConsumo: string
    localizacao: string
    estoqueMinimo: number = 0;// estoque muito vazio
    estoqueMaximo: number = 0;//estoque muito cheio
    estoqueAtual: number = 0; // atualiza de acordo com o movimento
    custoUnitarioAtual: number = 0;//atualiza de acordo com o movimento
    custoTotalAtual: number = 0  // atualiza de acordo com o movimento

}

