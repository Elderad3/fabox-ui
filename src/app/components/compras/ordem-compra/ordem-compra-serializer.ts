import { OrdemCompra } from "./ordem-compra.model";

export class OrdemCompraSerializer {

    resumo(json: any): OrdemCompra {
        const ordemCompra = new OrdemCompra();
        ordemCompra.id = json.id;
        ordemCompra.dataCriacao = json.dataCriacao;
        ordemCompra.status = json.status;
        return ordemCompra;

    }
}