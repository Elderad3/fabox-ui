import { FormMessageService } from 'src/app/shared/mensagens/form-message.service';
import { ProdutoService } from './../produto.service';
import { Movimento } from '../../movimento/movimento.model';
import { MessageService } from 'primeng/components/common/messageservice';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { tap, take } from 'rxjs/operators';
import { Produto } from '../produto.model';



@Component({
  selector: 'app-produto-view',
  templateUrl: './produto-view.component.html'
})
export class ProdutoViewComponent implements OnInit {

  produto: Produto
  titulo: string
  produtoSelecionado: Produto
  tipoProduto: string

  cols: any
  movimento: Movimento
  contador: number = 0
  ativo: boolean = true
  bloqueado: boolean = false


  constructor(private router: Router,
    private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    public msgForm: FormMessageService,
    private toasty: MessageService) { }

  ngOnInit() {
    this.movimento = new Movimento
    this.carregarColunasItens()
    this.produto = new Produto();
    this.activatedRoute.params.forEach((parametro: Params) => {
      let id = +parametro['id'];
      if (id) {
        this.buscarPorId(id)
        this.titulo = 'Visualizar Produto'
      
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
      this.toasty.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu o seguinte erro ao tentar buscar: ${err.message}` });
    })
  }

  /**
   * converte propriedade isAtivo e isBloqueado em boolean
   */
  booleanConverterAtivoBloqueado(){
    console.log(this.produto)
    if(this.produto.isAtivo == "Sim"){this.ativo = true}else{ this.ativo = false}
    if(this.produto.isBloqueado == "Sim"){this.bloqueado = true}else{ this.bloqueado = false}
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
   * carrega colunas da tabela de itens 
   */
  carregarColunasItens() {
    this.cols = [
      { field: 'id', header: 'Código', width: '5%' },
      { field: 'dataMovimento', header: 'Data Movimento', width: '30%' },
      { field: 'operacao', header: 'Operacao', width: '20%' },
      { field: 'quantidade', header: 'Quantidade', width: '20%' },
      { field: 'custoUnitario', header: 'Custo Unitário' },
      { field: 'custoTotal', header: 'Custo total' },
    ];
  }

  /**
   * retorna para a página de listagem
   */
  voltar() {
    this.router.navigate(['produtoMain'])
  }

}
