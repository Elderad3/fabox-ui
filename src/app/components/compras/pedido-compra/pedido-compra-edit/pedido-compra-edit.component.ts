
import { PedidoCompraService } from './../pedido-compra.service';
import { PedidoCompra } from '../pedido-compra.model';
import { PedidoCompraItem } from '../pedido-compra-item';
import { PedidoCompraGerente } from '../pedido-compra.gerente';
import { Produto } from 'src/app/components/estoque/produto/produto.model';
import { FormMessageService } from 'src/app/shared/mensagens/form-message.service';
import { ErrorService } from 'src/app/core/error-handler/errors.service';
import { ProdutoService } from 'src/app/components/estoque/produto/produto.service';

import { MessageService } from 'primeng/components/common/messageservice';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { NgForm } from '@angular/forms';
import { tap, take } from 'rxjs/operators';





@Component({
  selector: 'app-pedido-compra-edit',
  templateUrl: './pedido-compra-edit.component.html'
})
export class PedidoCompraEditComponent implements OnInit {

  pedidoCompra: PedidoCompra
  titulo: string
  pedidoCompraSelecionado: PedidoCompra
  @ViewChild("form")
  form: NgForm
  isEdicao: boolean = false


  @ViewChild('itemForm')
  itemForm: NgForm
  display: boolean = false
  msgContent: string = ""
  cols: any
  produtos: Produto[] = []
  listaDeProdutos: Produto[]
  item: PedidoCompraItem
  itemSelecionado: PedidoCompraItem
  contador: number = 0
  ativo: boolean = true
  bloqueado: boolean = false


  constructor(private router: Router,
    private pedidoCompraService: PedidoCompraService,
    private pedidoCompraGerente: PedidoCompraGerente,
    private activatedRoute: ActivatedRoute,
    public msgForm: FormMessageService,
    private toasty: MessageService,
    private errorService: ErrorService,
    private produtoService: ProdutoService) { }

  ngOnInit() {
    this.item = new PedidoCompraItem
    this.carregarColunasItens()
    this.pedidoCompra = new PedidoCompra();
    this.pedidoCompra.items = []
    this.prepararIncersaoItem()
    this.titulo = 'Incluir pedido de compra'
    this.activatedRoute.params.forEach((parametro: Params) => {
      let id = +parametro['id'];
      if (id) {
        this.buscarPorId(id)
        this.titulo = 'Editar Pedido de compra'
        this.contador = this.pedidoCompra.items.length + 1
      }
    })
  }


  /**
   * Busca entidade pelo Identificador
   * @param id 
   */
  buscarPorId(id: number) {
    this.pedidoCompraService.buscarPorId(id).pipe(
      tap(valor => console.log(valor)),
      take(1)
    ).subscribe((pedidoCompra: PedidoCompra) => {
      this.pedidoCompra = pedidoCompra;
    }, err => {
      this.errorService.handle(err) 
    })
  }

  /**
   * Envia para o service para realizar o salvamento ou atualização da entidade
   */
  salvar() {
    this.pedidoCompraGerente.enviaPedidoCompraParaAprovacao(this.pedidoCompra)
    this.pedidoCompraService.salvar(this.pedidoCompra).pipe(
      tap(valor => console.log(valor)),
      take(1)
    ).subscribe(() => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `Pedido ${this.pedidoCompra.id} foi salvo` });
    }, err => {
      this.errorService.handle(err)
    })
  }

  enviarParaAprovacao(){
    this.salvar()
  }

    /**
   * fornece opções autocomplete de produtos
   */
 listarProdutosPorParametro(event) {
    this.produtoService.listarEntidadesPorParametro(event.query).pipe(
      tap(valor => console.log(valor)),
      take(1))
      .subscribe((produtos: Produto[]) => {
        this.listaDeProdutos = []
        this.listaDeProdutos = produtos;
    },
     err => {
       this.errorService.handle(err)
    }
     )
  }

  aprovarPedidoCompra(){
    this.pedidoCompraGerente.aprovarPedidoCompra(this.pedidoCompra)
    this.pedidoCompraService.salvar(this.pedidoCompra).pipe(
      tap(valor => console.log(valor)),
      take(1)
    ).subscribe(() => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `PedidoCompra ${this.pedidoCompra.id} Foi aprovada`});
    }, err => {
      this.errorService.handle(err)
    })
  }

  rejeitarPedidoCompra(){
    this.pedidoCompraGerente.rejeitarPedidoCompra(this.pedidoCompra)
    this.pedidoCompraService.salvar(this.pedidoCompra).pipe(
      tap(valor => console.log(valor)),
      take(1)
    ).subscribe(() => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `PedidoCompra ${this.pedidoCompra.id} foi rejeitada`});
    }, err => {
      this.errorService.handle(err)
    })
  }

  //Métodos referentes aos itens da tabela do componente -----------------------------------------------------------------------------------

  /**
   * carrega colunas da tabela de itens 
   */
  carregarColunasItens() {
    this.cols = [
      { field: 'produto.nome', header: 'Produto' , width: '55%'},
      { field: 'quantidade', header: 'Quantidade' , width: '15%' },
      { field: 'custoAtual', header: 'Custo Un.' , width: '10%'},
      { field: 'custoTotal', header: 'Custo Total' , width: '10%'},
    ];
  }

  /**
 * preparar insersão de item na lista de item
 */
  prepararIncersaoItem() {
    this.item = { produto: null, quantidade: null, custoAtual: null, custoTotal: null };
    this.itemForm.reset()
  }

  /** 
* insere item na lista de itens
*/
  inserirItem() {
    //console.log(this.pedidoCompraGerente.produtoExistenteNaLista(this.item, this.pedidoCompra))
    if(this.pedidoCompraGerente.produtoExistenteNaLista(this.item, this.pedidoCompra) === true){
      this.display = true
      this.msgContent = `O produto ${this.item.produto.nome} já foi adicionado na lista`
      this.prepararIncersaoItem()
    }else{
        this.carregarCustosItem()
        this.pedidoCompra.items.push(this.item)
      this.prepararIncersaoItem()
    }
  }
   /** 
* adiciona item editado na lista
*/
  adicionarItemEditado(){
    this.carregarCustosItem()
      var resultado =   this.pedidoCompra.items.indexOf(this.itemSelecionado)
      if(resultado >= 0){
        this.pedidoCompra.items.splice(this.pedidoCompra.items.indexOf(this.itemSelecionado),1,this.item)
      }
      this.isEdicao = false
      this.prepararIncersaoItem()
  }

  /**
* prepara edição de item selecionado da listagem
*/
  editarItem(item: PedidoCompraItem) {
    this.isEdicao = true

    this.item = {
       produto: item.produto, quantidade: item.quantidade,
      custoAtual: item.custoAtual, custoTotal: item.custoTotal
    };
    this.itemSelecionado = item
  }

  /**
* remove item selecionado da listagem
*/
  removerItem(item: PedidoCompraItem) {
    this.itemSelecionado = item
    this.pedidoCompra.items.splice(this.pedidoCompra.items.indexOf(item), 1)
  }

  /**
* cancela inserção ou edição no dialog
*/
  cancelar() {
    this.itemForm.reset()
  }

  /**
   * retorna para a página de listagem
   */
  voltar() {
    this.form.resetForm()
    this.router.navigate(['pedidoCompraMain'])
  }

  
  /**
   * carrega objeto em coluna de tabela
   */
  carregarObjetoColuna(row: any, col: any): any {
    const nestedProperties: string[] = col.field.split('.');
    let value: any = row;
    for (const prop of nestedProperties) {
      value = value[prop];
    }
    return value;
  }

  /**
   * carrega valor do item no evento blur
   */
carregarCustosItem(){ 
  this.item.custoAtual = this.item.produto.custoUnitarioAtual
  this.item.custoTotal = this.item.custoAtual * this.item.quantidade
}
calcularTotalItensPedido(){
  return this.pedidoCompraGerente.calcularCustoTotalItensPedido(this.pedidoCompra)
}

 /**
   * fecha dialogo do componente dialog-mensage
   */
  fecharDialogoItem(display){
   this.display = display
  }

}
