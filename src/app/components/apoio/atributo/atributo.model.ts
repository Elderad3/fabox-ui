import { GenericId } from './../../../core/generic-id';
import { Coluna } from './coluna.model';
import { Esquema } from './esquema.model';
import { Tabela } from './tabela.model';

export class Atributo extends GenericId{
    nome: string;
    esquema: Esquema;
    tabela: Tabela;
    mascara: string
    colunasDisponiveis: Coluna[]=[]
    colunasSelecionadas: Coluna[]=[]
    tamanho: string
    mascaraTitulo: string
}