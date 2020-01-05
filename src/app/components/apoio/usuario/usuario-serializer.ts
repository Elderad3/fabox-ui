import { Usuario } from './usuario.model';

export class UsuarioSerializer {
   
    resumo(json: any): Usuario {
        const usuario = new Usuario();
        usuario.id = json.id;
        usuario.nome = json.nome;
        usuario.email = json.email
        usuario.isAtivo = json.isAtivo
        return usuario;
       
    }
}