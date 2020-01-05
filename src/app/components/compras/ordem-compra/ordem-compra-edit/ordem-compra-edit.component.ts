
import { OrdemCompraService } from './../ordem-compra.service';
import { OrdemCompra } from '../ordem-compra.model';
import { OrdemCompraItem } from '../ordem-compra-item';
import { OrdemCompraGerente } from '../ordem-compra.gerente';
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
  selector: 'app-ordem-compra-edit',
  templateUrl: './ordem-compra-edit.component.html'
})
export class OrdemCompraEditComponent implements OnInit {

  ordemCompra: OrdemCompra
  titulo: string
  ordemCompraSelecionado: OrdemCompra
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
  item: OrdemCompraItem
  itemSelecionado: OrdemCompraItem

  ativo: boolean = true
  bloqueado: boolean = false


  constructor(private router: Router,
    private ordemCompraService: OrdemCompraService,
    private ordemCompraGerente: OrdemCompraGerente,
    private activatedRoute: ActivatedRoute,
    public msgForm: FormMessageService,
    private toasty: MessageService,
    private errorService: ErrorService,
    private produtoService: ProdutoService) { }

  ngOnInit() {
    this.item = new OrdemCompraItem
    this.carregarColunasItens()
    this.ordemCompra = new OrdemCompra();
    this.ordemCompra.items = []
    this.prepararIncersaoItem()
    this.titulo = 'Incluir ordem de compra'
    this.activatedRoute.params.forEach((parametro: Params) => {
      let id = +parametro['id'];
      if (id) {
        this.buscarPorId(id)
        this.titulo = 'Editar Ordem de compra'
      }
    })
  }


  /**
   * Busca entidade pelo Identificador
   * @param id 
   */
  buscarPorId(id: number) {
    this.ordemCompraService.buscarPorId(id).pipe(
      tap(valor => console.log(valor)),
      take(1)
    ).subscribe((ordemCompra: OrdemCompra) => {
      this.ordemCompra = ordemCompra;
    }, err => {
      this.errorService.handle(err) 
    })
  }

  /**
   * Envia para o service para realizar o salvamento ou atualização da entidade
   */
  salvar() {
    this.ordemCompraService.salvar(this.ordemCompra).pipe(
      tap(ordem => 
      this.buscarPorId(ordem.id)),
      take(1)
    ).subscribe(() => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `A ordem foi salva` });
      
    }, err => {
      this.errorService.handle(err)
    })
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

  enviarParaFornecedor(){
    this.ordemCompraGerente.enviarParaFornecedor(this.ordemCompra)
    this.ordemCompraService.salvar(this.ordemCompra).pipe(
      take(1)
    ).subscribe(() => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `OrdemCompra ${this.ordemCompra.id} Foi enviada para o email do fornecedor`});
    }, err => {
      this.errorService.handle(err)
    })
  }

  iniciarRecebimento(){
    this.ordemCompraGerente.iniciarRecebimento(this.ordemCompra)
    this.ordemCompraService.salvar(this.ordemCompra).pipe(
      tap(valor => console.log(valor)),
      take(1)
    ).subscribe(() => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `recebimento iniciado da ordem de compra ${this.ordemCompra.id}`});
    }, err => {
      this.errorService.handle(err)
    })
  }

  finalizarRecebimento(){
    this.ordemCompraGerente.finalizarRecebimento(this.ordemCompra)
    this.ordemCompraService.salvar(this.ordemCompra).pipe(
      tap(valor => console.log(valor)),
      take(1)
    ).subscribe(() => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `recebimento da ordem de compra ${this.ordemCompra.id} concluído`});
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
    //console.log(this.ordemCompraGerente.produtoExistenteNaLista(this.item, this.ordemCompra))
    if(this.ordemCompraGerente.produtoExistenteNaLista(this.item, this.ordemCompra) === true){
      this.display = true
      this.msgContent = `O produto ${this.item.produto.nome} já foi adicionado na lista`
      this.prepararIncersaoItem()
    }else{
        this.carregarCustosItem()
        this.ordemCompra.items.push(this.item)
      this.prepararIncersaoItem()
    }
  }
   /** 
* adiciona item editado na lista
*/
  adicionarItemEditado(){
    this.carregarCustosItem()
      var resultado =   this.ordemCompra.items.indexOf(this.itemSelecionado)
      if(resultado >= 0){
        this.ordemCompra.items.splice(this.ordemCompra.items.indexOf(this.itemSelecionado),1,this.item)
      }
      this.isEdicao = false
      this.prepararIncersaoItem()
  }

  /**
* prepara edição de item selecionado da listagem
*/
  editarItem(item: OrdemCompraItem) {
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
  removerItem(item: OrdemCompraItem) {
    this.itemSelecionado = item
    this.ordemCompra.items.splice(this.ordemCompra.items.indexOf(item), 1)
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
    this.router.navigate(['ordemCompraMain'])
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
calcularTotalItensOrdem(){
  return this.ordemCompraGerente.calcularCustoTotalItensOrdem(this.ordemCompra)
}

 /**
   * fecha dialogo do componente dialog-mensage
   */
  fecharDialogoItem(display){
   this.display = display
  }

}
