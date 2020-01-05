import { ErrorService } from 'src/app/core/error-handler/errors.service';
import { UsuarioGerente } from './../usuario.gerente';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

import { Message } from 'primeng/components/common/message';
import { UsuarioService } from './../usuario.service';
import { Usuario } from '../usuario.model';


@Component({
  selector: 'app-usuario-main',
  templateUrl: './usuario-main.component.html'
})
export class UsuarioMainComponent implements OnInit {

  titulo: string = "Usuários"
  usuarios: Usuario[] = []
  usuarioSelecionado: Usuario
  display: boolean = false
  msgContent: string
  msgs: Message[] = [];
  isAtivo: string
  cols: any

  constructor(private router: Router,
    private usuarioGerente: UsuarioGerente,
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.todos();
    this.carregarTabela()
  }

  /**
   * Carrega prorpiedades da da tabela
   */
  carregarTabela() {
    this.cols = [
      { field: 'id', header: 'Id', width: '5%' },
      { field: 'nome', header: 'Nome' },
      { field: 'email', header: 'Email' },
      { field: 'isAtivo', header: 'Ativo' },
    ];
  }

  /**
   * Lista todas as propriedades existentes
   */
  todos() {
    this.usuarioService.listar().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    }, err => {
      this.errorService.handle(err)
    })
  }

  /**
* Envia comando para o service para remover uma propriedade
*/
  remover() {
    if (this.usuarioGerente.validarExclusao(this.usuarioSelecionado)) {
      this.msgContent = `${this.usuarioSelecionado.nome} não pode ser excluído(a) pois está ativo`
      this.display = true
    } else {
      this.confirmationService.confirm({
        message: 'Tem certeza de que deseja excluir?',
        accept: () => {
          this.usuarioService.excluir(this.usuarioSelecionado.id).subscribe((usuarioId: number) => {
            this.todos();
          });
        }
      })
    }
  }

  /**
* Envia comando para o service para desativar uma propriedade
*/
  desativar() {
    this.usuarioSelecionado = this.usuarioGerente.desativarUsuario(this.usuarioSelecionado)
    this.usuarioService.salvar(this.usuarioSelecionado).subscribe(() => {
      this.msgContent =  `${this.usuarioSelecionado.nome} não foi desativado(a)`
      this.display = true
    });

  }

  /**
* Envia comando para o service para ativar uma propriedade
*/
  ativar() {
    this.usuarioSelecionado = this.usuarioGerente.ativarUsuario(this.usuarioSelecionado)
    this.usuarioService.salvar(this.usuarioSelecionado).subscribe(() => {
      this.msgContent =  `${this.usuarioSelecionado.nome} não foi ativado(a)`
      this.display = true
    });
  }

  /**
* Navega para a página de visualização passando o ID pela rota
*/
  visualizar() {
    this.router.navigate(['/usuarioView', this.usuarioSelecionado.id])
  }

  /**
  * Navega para a página de edição passando o ID pela rota
  */
  editar() {
    this.router.navigate(['/usuarioEdit', this.usuarioSelecionado.id])
  }

  /**
    * fecha dialogo do componente dialog-mensage
    */
  fecharDialogoItem(display) {
    this.display = display
  }




}
