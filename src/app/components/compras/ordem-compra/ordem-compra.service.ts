import { OrdemCompraSerializer } from './ordem-compra-serializer';
import { ResourceService } from './../../../core/resource.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdemCompra } from './ordem-compra.model';

@Injectable() 
export class OrdemCompraService extends ResourceService<OrdemCompra> {

    constructor(http: HttpClient) { 
        super(
          http,
          'ordemCompra',
          new OrdemCompraSerializer()
         );  
       }

}