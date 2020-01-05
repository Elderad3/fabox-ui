import { ResourceService } from './../../../core/resource.service';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Atributo } from './atributo.model';
import { AtributoSerializer } from './atributo.serializer';

@Injectable(
  {providedIn: 'root',}
  )
export class AtributoService extends ResourceService<Atributo> {

 constructor(http: HttpClient) { 
  super(
    http,
    'atributo',
    new AtributoSerializer()
   );  
 }
}


