import { ResourceService } from './../../../core/resource.service';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from './usuario.model';
import { UsuarioSerializer } from './usuario-serializer';


@Injectable()
export class UsuarioService extends ResourceService<Usuario> { 

  constructor(http: HttpClient) { 
    super(
      http,
      'usuario',
      new UsuarioSerializer()
     );
   }
}


