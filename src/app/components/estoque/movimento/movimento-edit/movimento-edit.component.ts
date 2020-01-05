import { ProdutoGerente } from './../../produto/produto.gerente';
import { Operacao } from './../operacao';
import { ProdutoService } from './../../produto/produto.service';
import { MovimentoService } from './../movimento.service';


import { Produto } from '../../produto/produto.model';
import { MessageService } from 'primeng/components/common/messageservice';
import { Movimento } from '../movimento.model';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { NgForm } from '@angular/forms';
import { tap, take } from 'rxjs/operators';
import { FormMessageService } from 'src/app/shared/mensagens/form-message.service';
import { ErrorService } from 'src/app/core/error-handler/errors.service';




@Component({
  selector: 'app-movimento-edit',
  templateUrl: './movimento-edit.component.html'
})
export class MovimentoEditComponent implements OnInit {

  movimento: Movimento
  produtos: Produto[] = []
  titulo: string
  movimentoSelecionado: Movimento
  @ViewChild("form")
  form: NgForm
  tipoMovimento: string
  isEdicao: boolean = false
  operacoes: Operacao[] = []
  cols: any
  ativo: boolean = true
  bloqueado: boolean = false

  display: boolean = false 
  msgContent: string


  constructor(private router: Router,
    private movimentoService: MovimentoService,
    private produtoService: ProdutoService,
    private produtoGerente: ProdutoGerente, 
    private activatedRoute: ActivatedRoute,
    public msgForm: FormMessageService,
    private toasty: MessageService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.movimento = new Movimento();
    this.movimento.dataMovimento = new Date
    this.carregarProdutos()
    this.carregarOperacoes()
    this.titulo = 'Inserir Movimento'
    this.activatedRoute.params.forEach((parametro: Params) => {
      let id = +parametro['id'];
      if (id) {
        this.buscarPorId(id)
        this.titulo = 'Editar Movimento' 
        this.isEdicao = true
      }
    })
  }


  /**
   * Busca entidade pelo Identificador
   * @param id 
   */
  buscarPorId(id: number) {
    this.movimentoService.buscarPorId(id).pipe(
      tap(valor => console.log(valor)),
      take(1))
      .subscribe((movimento: Movimento) => {
      this.movimento = movimento;
    }, err => {
      this.errorService.handle(err)
    })
  }

  /**
   * recebe os dados do html, trata e envia para o service para realizar o salvamento ou atualização da entidade
   */
  salvar() {
    this.produtoService.salvar(this.produtoGerente.atualizarMovimentoProduto(this.movimento)).pipe(
      tap(valor => console.log(valor)),
      take(1))
      .subscribe(() => {
    }, err => {
      this.errorService.handle(err)
    })
    this.movimentoService.salvar(this.movimento).pipe(
      tap(valor => console.log(valor)),
      take(1))
      .subscribe(() => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `Movimento Incluso` });
    }, err => {
      this.errorService.handle(err)
    })
  }
  
  /**
   * Calcula o custo total do produto quando selecionada a quantidade ou o custo unitário
  */
  calcularCustoTotal() {
    this.carregarCustos()
    this.movimento.custoTotal = this.movimento.quantidade * this.movimento.custoUnitario
  }
    /**
   * carrega informações de custo quando a operação do movimento for saída
   */
  carregarCustos(){
    if(this.movimento.operacao.valor == 'S'){
      this.movimento.custoUnitario = this.movimento.produto.custoUnitarioAtual
    }
  }

  /**
   * Carrega produtos na seleção dropdown
   */
  carregarProdutos() {
    this.produtoService.listar() .pipe(
      take(1)
    ).subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    }, err => {
      this.errorService.handle(err)
    })
  }

  /**
   * Carrega operações na seleção dropdown
   */
  carregarOperacoes() {
    this.operacoes = [
      { id: 1, nome: 'Entrada', valor: 'E' },
      { id: 2, nome: 'Saída', valor: 'S' },
    ]
  }
    /**
   * Valida estoque antes da persistência do movimento
   */
  validarEstoque(movimento: Movimento){
    if(movimento.operacao.valor == 'S' && movimento.produto.estoqueAtual < movimento.quantidade){
      this.msgContent = `Estoque insuficiente para realizar a operação. 
      Quantidade em estoque: ${movimento.produto.estoqueAtual}, Quantidade pretendida: ${movimento.quantidade}` 
      movimento.quantidade = movimento.produto.estoqueAtual
      this.display = true
    }else{
      this.salvar()
    }
  }

  /**
   * retorna para a página de listagem
   */
  voltar() {
    this.form.resetForm()
    this.router.navigate(['movimentoMain'])
  }

   /**
   * fecha dialogo do componente dialog-mensage
   */
  fecharDialogoItem(display){
    this.display = display
   }

}
