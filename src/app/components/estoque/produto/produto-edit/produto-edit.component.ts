
import { ProdutoService } from './../produto.service';
import { Movimento } from '../../movimento/movimento.model';
import { Produto } from '../produto.model';
import { MessageService } from 'primeng/components/common/messageservice';

import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { NgForm } from '@angular/forms';
import { tap, take } from 'rxjs/operators';
import { FormMessageService } from 'src/app/shared/mensagens/form-message.service';
import { ErrorService } from 'src/app/core/error-handler/errors.service';




@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html'
})
export class ProdutoEditComponent implements OnInit {

  produto: Produto
  titulo: string
  produtoSelecionado: Produto
  @ViewChild("form")
  form: NgForm
  isEdicao: boolean = false
  emitirErroMessage = new EventEmitter<string>();

  
  movimentos: Movimento[]=[]
  ativo: boolean = true
  bloqueado: boolean = false
  operacoes: any 


  constructor(private router: Router,
    private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    public msgForm: FormMessageService,
    private toasty: MessageService,
    private errorService: ErrorService) { }

  ngOnInit() {
    
    this.produto = new Produto();
    this.titulo = 'Cadastro Produto'
    this.activatedRoute.params.forEach((parametro: Params) => {
      let id = +parametro['id'];
      if (id) {
        this.buscarPorId(id)
        this.titulo = 'Editar Produto'
        this.isEdicao = true
      }
    })
  }


  /**
   * Busca entidade pelo Identificador
   * @param id 
   */
  buscarPorId(id: number) {
    this.produtoService.buscarPorId(id).pipe(
      tap(valor => console.log(valor)),
      take(1))
      .subscribe((produto: Produto) => {
      this.produto = produto;
      this.booleanConverterAtivoBloqueado()
    }, err => {
      this.errorService.handle(err)
    })
  }

  /**
   * recebe os dados do html, trata e envia para o service para realizar o salvamento ou atualização da entidade
   */
  salvar() {
    this.stringConverterAtivoBloqueado()
    this.produtoService.salvar(this.produto)
    .pipe(
      tap(valor => console.log(valor)),
      take(1)).subscribe(() => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `${this.produto.nome} foi salvo com sucesso` });
    }, err => {
      this.errorService.handle(err)
    })
  }

  /**
   * converte propriedade isAtivo e isBloquueado em boolean
   */
  booleanConverterAtivoBloqueado(){
    if(this.produto.isAtivo === "Sim"){this.ativo = true}else{ this.ativo = false}
    if(this.produto.isBloqueado === "Sim"){this.bloqueado = true}else{ this.bloqueado = false}
  }

   /**
   * converte propriedade Ativo e Bloquueado em string
   */
  stringConverterAtivoBloqueado(){
    if(this.ativo){this.produto.isAtivo = "Sim"}else{this.produto.isAtivo = "Não"}
    if(this.bloqueado){this.produto.isBloqueado = "Sim"}else{this.produto.isBloqueado = "Não"}
  }

  
  //Métodos referentes aos itens da tabela do componente -----------------------------------------------------------------------------------


  /**
   * retorna para a página de listagem
   */
  voltar() {
    this.form.resetForm()
    this.router.navigate(['produtoMain'])
  }

}
