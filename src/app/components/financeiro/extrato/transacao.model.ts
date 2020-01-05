import { Conta } from './conta.model';
import { Categoria } from './categoria.model';
import { GenericId } from 'src/app/core/generic-id';
export class Transacao extends GenericId {

    codigo: string
    conta: string
    tipo: string
    data: Date
    categoria: Categoria
    isAtivo: string
    valor: number
    descricao: string

    // private String codigo;
	// private TransactionType tipo;
	// private Date data;
	// private double valor;
	// private String descricao;

}