import { ResourceService } from './../../../core/resource.service';
import { PedidoCompraSerializer } from './pedido-compra-serializer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PedidoCompra } from './pedido-compra.model';

@Injectable() 
export class PedidoCompraService extends ResourceService<PedidoCompra> {

    constructor(http: HttpClient) { 
        super(
          http,
          'pedidoCompra',
          new PedidoCompraSerializer()
         );  
       }

}