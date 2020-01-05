

import { Message } from 'primeng/components/common/message';
import { MessageService } from 'primeng/components/common/messageservice';
import { MovimentoService } from './../movimento.service';
import { Movimento } from '../movimento.model';

import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { tap, take } from 'rxjs/operators';
import { ErrorService } from 'src/app/core/error-handler/errors.service';



@Component({
  selector: 'app-movimento-main',
  templateUrl: './movimento-main.component.html'
})
export class MovimentoMainComponent implements OnInit {

  titulo: string = "Movimentos do Estoque"
  movimentos: Movimento[] = []
  movimentoSelecionado: Movimento
  display: boolean = false
  msgContent: string
  msgs: Message[] = [];
  cols: any

  constructor(private router: Router,
    private movimentoService: MovimentoService,
    private confirmationService: ConfirmationService,
    private erroService: ErrorService,
    private toasty: MessageService) { }

  ngOnInit() {
    this.todos();
    this.carregarTabela()
  }

  /**
   * Carrega propriedades da tabela
   */
  carregarTabela() {
    this.cols = [
      { field: 'id', header: 'Id', width: '5%' },
      { field: 'dataMovimento', header: 'Data do movimento' },
      { field: 'produto.nome', header: 'Produto' },
      { field: 'quantidade', header: 'Quantidade' }, 
      { field: 'custoUnitario', header: 'Custo Unitário' }, 
      { field: 'custoTotal', header: 'Custo Total' },
      { field: 'operacao.nome', header: 'Operação' }, 
    ];
  }

  /**
   * Lista todas as propriedades existentes
   */
  todos() {
    this.movimentoService.listar() .pipe( 
      take(1)
    ).subscribe((movimentos: Movimento[]) => {
      this.movimentos = movimentos;
    }, err => {
      this.erroService.handle(err)
    })
  }

  /**
* Envia comando para o service para remover uma propriedade
*/
  remover() {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir?',
      accept: () => {
       this.excluir(this.movimentoSelecionado.id);
      }
    })
  }

/**
 * Exclui um registro selecionado
 * @param id 
 */
  excluir(id:number){
    this.movimentoService.excluir(id).pipe(
      tap(valor => console.log(valor)),
      take(1))
      .subscribe((movimentoId: number) => {
      this.todos();
    })
  }

  /**
* Navega para a página de visualização passando o ID pela rota
*/
  visualizar() {
    this.router.navigate(['/movimentoView', this.movimentoSelecionado.id])
  }

  /**
  * Navega para a página de edição passando o ID pela rota
  */
  editar() {
    this.router.navigate(['/movimentoEdit', this.movimentoSelecionado.id])
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
   * fecha dialogo do componente dialog-mensage
   */
  fecharDialogoItem(display){
    this.display = display
   }

}
