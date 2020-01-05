import { ErrorService } from './../../../../core/error-handler/errors.service';
import { UsuarioGerente } from './../usuario.gerente';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { MessageService } from 'primeng/components/common/messageservice';



import { UsuarioService } from './../usuario.service';
import { NgForm } from '@angular/forms';
import { Usuario } from '../usuario.model';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html'
})
export class UsuarioEditComponent implements OnInit { 

  usuario: Usuario
  titulo: string
  usuarios = [];
  usuarioSelecionado: Usuario 
  @ViewChild("usuForm", {static: false})
  usuForm: NgForm
  ativo: SelectItem[]
  

  constructor(private router: Router,
    private usuarioService: UsuarioService, 
    private usuarioGerente: UsuarioGerente,
    private activatedRoute: ActivatedRoute,
    private toasty: MessageService,
    private errorService: ErrorService) { 
    }

  ngOnInit() {
    this.usuario = new Usuario();
    this.titulo = 'Cadastro de Usuário'
    this.activatedRoute.params.forEach((parametro: Params) => {
      let id = +parametro['id'];
      if (id) {
        this.buscarPorId(id)
        this.titulo = 'Editar Usuário'

      }})}

  
/**
 * Busca entidade pelo Identificador
 * @param id 
 */
  buscarPorId(id: number){
    this.usuarioService.buscarPorId(id).subscribe((usuario: Usuario) => {
      this.usuario = usuario;
    }, err => {
      this.errorService.handle(err)
    })
  }

/**
 * recebe os dados do html, trata e envia para o service para realizar o salvamento ou atualização da entidade
 */
salvar(){
    this.usuarioService.salvar(this.usuario).subscribe((usuario: Usuario )=>{
     this.toasty.add({severity:'success', summary:'Sucesso', detail:`${this.usuario.nome} foi salvo com sucesso`});
     this.usuForm.resetForm()
   }, err => {
    this.errorService.handle(err)
   })
   } 

   ativarUsuario(){
    this.usuario = this.usuarioGerente.ativarUsuario(this.usuario);
  }

  desativarUsuario(){
    this.usuario = this.usuarioGerente.desativarUsuario(this.usuario);
  }
/**
 * retorna para a página de listagem
 */
  voltar() {
    this.router.navigate(['usuarioMain'])}
}
