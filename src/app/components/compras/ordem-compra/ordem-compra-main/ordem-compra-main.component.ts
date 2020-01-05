import { ErrorService } from 'src/app/core/error-handler/errors.service';
import { Message } from 'primeng/components/common/message';
import { MessageService } from 'primeng/components/common/messageservice';
import { OrdemCompraService } from './../ordem-compra.service';
import { OrdemCompra } from '../ordem-compra.model';

import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { tap, take } from 'rxjs/operators';
import { OrdemCompraGerente } from '../ordem-compra.gerente';

@Component({
  selector: 'app-ordem-compra-main',
  templateUrl: './ordem-compra-main.component.html'
})
export class OrdemCompraMainComponent implements OnInit {

  titulo: string = "Ordems de Compra"
  ordemCompras: OrdemCompra[] = []
  ordemCompraSelecionado: OrdemCompra
  display: boolean
  msgContent: string
  ordemCompra: OrdemCompra = new OrdemCompra

  msgs: Message[] = [];
  cols: any

  constructor(private router: Router,
    private ordemCompraService: OrdemCompraService,
    private ordemCompraGerente: OrdemCompraGerente,
    private confirmationService: ConfirmationService,
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
    this.ordemCompraService.listar().pipe(
      take(1))
      .subscribe((ordemCompras: OrdemCompra[]) => {
      this.ordemCompras = ordemCompras;
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
      if(this.ordemCompraGerente.validarExclusao(this.ordemCompraSelecionado)=== false){
        this.msgContent = `Uma ordem com o status ${this.ordemCompraSelecionado.status} não pode ser excluída.`
        this.display = true
      } else{
      this.confirmationService.confirm({
        message: 'Tem certeza de que deseja excluir?',
        accept: () => {
          this.excluir(this.ordemCompraSelecionado.id);
        }
      })}
  }
  /**
   * Envia comando para o service para remover uma propriedade
   * @param id 
   */
  excluir(id: number){
    this.ordemCompraService.excluir(id).pipe(
      tap(valor => console.log(valor)),
      take(1))
      .subscribe((ordemCompraId: number) => {
      this.todos();
    })
  }
   /**
 * Navega para a página de visualização passando o ID pela rota
 */
visualizar() {
  this.router.navigate(['/ordemCompraView', this.ordemCompraSelecionado.id])
}

/**
* Navega para a página de edição passando o ID pela rota
*/
editar() {
  this.router.navigate(['/ordemCompraEdit', this.ordemCompraSelecionado.id])
}

 /**
   * fecha dialogo do componente dialog-mensage
   */
  fecharDialogoItem(display){
    this.display = display
   }


}
