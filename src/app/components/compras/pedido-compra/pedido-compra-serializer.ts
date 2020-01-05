import { PedidoCompra } from './pedido-compra.model';

export class PedidoCompraSerializer {

    resumo(json: any): PedidoCompra {
        const pedidoCompra = new PedidoCompra();
        pedidoCompra.id = json.id;
        pedidoCompra.dataCriacao = json.dataCriacao;
        pedidoCompra.status = json.status;
        return pedidoCompra;

    }
}