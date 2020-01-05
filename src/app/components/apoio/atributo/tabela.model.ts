import { GenericId } from './../../../core/generic-id';
import { Coluna } from './coluna.model';
export class Tabela extends GenericId{
mascara: string
colunas: Coluna[]=[]
}