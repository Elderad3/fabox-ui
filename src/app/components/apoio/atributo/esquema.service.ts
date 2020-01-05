import { ResourceService } from './../../../core/resource.service';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Esquema } from './esquema.model';
import { EsquemaSerializer } from './esquema.serializer';

@Injectable(
  {providedIn: 'root',}
  )
export class EsquemaService extends ResourceService<Esquema> {

 constructor(http: HttpClient) { 
  super(
    http,
    'esquema',
    new EsquemaSerializer()
   );  
 }
}


