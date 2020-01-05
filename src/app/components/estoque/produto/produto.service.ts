import { ProdutoSerializer } from './produto-serializer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Produto } from './produto.model';
import { ResourceService } from 'src/app/core/resource.service';

@Injectable()
export class ProdutoService extends ResourceService<Produto> {

 constructor(http: HttpClient) {
  super(
    http,
    'produto',
    new ProdutoSerializer()
   );
  }
 
}


