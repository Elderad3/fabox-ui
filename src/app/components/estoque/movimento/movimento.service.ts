
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovimentoSerializer } from './movimento-serializer';
import { Movimento } from './movimento.model';
import { ResourceService } from 'src/app/core/resource.service';


@Injectable()
export class MovimentoService extends ResourceService<Movimento> {

  constructor(http: HttpClient) { 
    super(
      http,
      'movimento',
      new MovimentoSerializer()
     );  
   }


}