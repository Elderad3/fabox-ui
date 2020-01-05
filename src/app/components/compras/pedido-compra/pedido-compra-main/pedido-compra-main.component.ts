import { ErrorService } from 'src/app/core/error-handler/errors.service';
import { Message } from 'primeng/components/common/message';
import { MessageService } from 'primeng/components/common/messageservice';
import { PedidoCompraService } from './../pedido-compra.service';
import { PedidoCompra } from '../pedido-compra.model';

import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-pedido-compra-main',
  templateUrl: './pedido-compra-main.component.html'
})
export class PedidoCompraMainComponent implements OnInit {

  titulo: string = "Pedidos de Compra"
  pedidoCompras: PedidoCompra[] = []
  pedidoCompraSelecionado: PedidoCompra
  display: boolean
  msgContent: string
  pedidoCompra: PedidoCompra = new PedidoCompra

  msgs: Message[] = [];
  cols: any

  constructor(private router: Router,
    private pedidoCompraService: PedidoCompraService,
    private confirmationService: ConfirmationService,
    private toasty: MessageService,
    private errorService:ErrorService) { }

  ngOnInit() {
    this.todos();
    this.carregarTabela()
  }

  /**
   * Carrega propriedades da da tabela
   */
  carregarTabela() {
    this.cols = [
      { field: 'id', header: 'Código', width: '10%',  },
      { field: 'dataCriacao', header: 'Data de criação', width: '15%',},
      // { field: 'fornecedor', header: 'Fornecedor',tipo:'normal' },
      { field: 'status', header: 'Status',},  
    ];
  }

  /**
   * Lista todas as propriedades existentes
   */
  todos() {
    this.pedidoCompraService.listar().pipe(
      take(1))
      .subscribe((pedidoCompras: PedidoCompra[]) => {
      this.pedidoCompras = pedidoCompras;
    },
     err => {
       this.errorService.handle(err)
    }
     )
  }

   /**
 * Exibe a confirmação de exclusão
 */
  remover() {
      this.confirmationService.confirm({
        message: 'Tem certeza de que deseja excluir?',
        accept: () => {
          this.excluir(this.pedidoCompraSelecionado.id);
        }
      })
  }
  /**
   * Envia comando para o service para remover uma propriedade
   * @param id 
   */
  excluir(id: number){
    this.pedidoCompraService.excluir(id).pipe(
      tap(valor => console.log(valor)),
      take(1))
      .subscribe((pedidoCompraId: number) => {
      this.todos();
    })
  }
   /**
 * Navega para a página de visualização passando o ID pela rota
 */
visualizar() {
  this.router.navigate(['/pedidoCompraView', this.pedidoCompraSelecionado.id])
}

/**
* Navega para a página de edição passando o ID pela rota
*/
editar() {
  this.router.navigate(['/pedidoCompraEdit', this.pedidoCompraSelecionado.id])
}


}
