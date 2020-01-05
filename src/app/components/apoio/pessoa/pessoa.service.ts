import { Endereco } from './endereco.model';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pessoa } from './pessoa.model';
import { PessoaSerializer } from './pessoa.serializer';
import { ResourceService } from 'src/app/core/resource.service';

@Injectable(
  {providedIn: 'root',}
  )
export class PessoaService extends ResourceService<Pessoa> {

 constructor(http: HttpClient) { 
  super(
    http,
    'pessoa',
    new PessoaSerializer()
   );  
 }
}


