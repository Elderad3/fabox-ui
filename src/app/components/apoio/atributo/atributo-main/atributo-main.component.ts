import { ErrorService } from './../../../../core/error-handler/errors.service';

import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

import { Message } from 'primeng/components/common/message';
import { MessageService } from 'primeng/components/common/messageservice';
import { AtributoService } from './../atributo.service';
import { Atributo } from './../atributo.model';
import { tap, take } from 'rxjs/operators'; 


@Component({
  selector: 'app-atributo-main', 
  templateUrl: './atributo-main.component.html'
})
export class AtributoMainComponent implements OnInit {

  titulo: string = "Atributo Jurídica"
  atributos: Atributo[] = []
  atributoSelecionado: Atributo
  display: boolean = false
  msgContent: string
  msgs: Message[] = [];
  cols: any

  constructor(private router: Router,
    private atributoService: AtributoService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.listar();
    this.carregarTabela()
  }

  /**
   * Carrega propriedades da da tabela
   */
  carregarTabela() {
    this.cols = [
      { field: 'id', header: 'Cód.', width: '7%' },
      { field: 'nome', header: 'Nome' },
      { field: 'esquema.mascara', header: 'Esquema' },
      { field: 'tabela.mascara', header: 'Tabela' },
      { field: 'mascaraTitulo', header: 'Máscara do Título' },
    ];
  }

  /**
   * Lista todas as propriedades existentes
   */
  listar() {
    this.atributoService.listar().pipe(
      take(1)
    ).subscribe((atributos: Atributo[]) => {
      this.atributos = atributos;
  
   }, err => {
    this.errorService.handle(err)
   })
  }

   /**
 * Envia comando para o service para remover uma propriedade
 */
  remover() {
      this.confirmationService.confirm({
        message: 'Tem certeza de que deseja excluir?',
        accept: () => {
          this.excluir(this.atributoSelecionado.id)
        }
      })
  }
 /**
  * exclui o registro selecionado
  * @param id 
  */
  excluir(id: number){
    this.atributoService.excluir(id)
    .pipe(
      tap(valor => console.log(valor)),
      take(1)
    ).subscribe((atributoId: number) => {
      this.listar();
    });

  }

/**
* Navega para a página de edição passando o ID pela rota
*/
editar() {
  this.router.navigate(['/atributoEdit', this.atributoSelecionado.id])
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
