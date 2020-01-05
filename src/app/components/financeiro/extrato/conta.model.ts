import { GenericId } from 'src/app/core/generic-id';
export class Conta extends GenericId {
    banco: string
    agencia: string
    numeroConta: string
}

