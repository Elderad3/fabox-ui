import { GenericId } from './../../../core/generic-id';
import { Tabela } from './tabela.model';
export class Esquema extends GenericId{
    mascara: string
    tabelas: Tabela[]=[]

}