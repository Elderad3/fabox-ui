import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';

@Injectable({ 
    providedIn: 'root' 
  })
export class UsuarioGerente { 

  constructor(){}

ativarUsuario(usuario: Usuario){
    usuario.isAtivo = 'Sim'
    return usuario
}

desativarUsuario(usuario: Usuario){
    usuario.isAtivo = 'Não'
    return usuario
}

validarExclusao(usuario: Usuario){
if(usuario.isAtivo == 'Não'){return false}
 return true
}
}