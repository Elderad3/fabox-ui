import { TransacaoSerializer } from './transacao-serializer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Transacao } from './transacao.model';
import { ResourceService } from 'src/app/core/resource.service';

@Injectable()
export class TransacaoService extends ResourceService<Transacao> {

 constructor(http: HttpClient) {
  super(
    http,
    'transacao',
    new TransacaoSerializer()
   );
  }
 
}


