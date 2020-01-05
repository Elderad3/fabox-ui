
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

import { Message } from 'primeng/components/common/message';
import { MessageService } from 'primeng/components/common/messageservice';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../pessoa.model';
import { tap, take } from 'rxjs/operators'; 
import { ErrorService } from 'src/app/core/error-handler/errors.service';



@Component({
  selector: 'app-pessoa-main', 
  templateUrl: './pessoa-main.component.html'
})
export class PessoaMainComponent implements OnInit {

  titulo: string = "Pessoa Jurídica"
  pessoas: Pessoa[] = []
  pessoaSelecionado: Pessoa
  display: boolean = false
  msgContent: string
  msgs: Message[] = [];
  cols: any

  constructor(private router: Router,
    private pessoaService: PessoaService,
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
      // { field: 'cnpj', header: 'CNPJ' },
      // { field: 'email', header: 'Email' },
    ];
  }

  /**
   * Lista todas as propriedades existentes
   */
  listar() {
    this.pessoaService.listar().pipe(
      take(1)
    ).subscribe((pessoas: Pessoa[]) => {
      this.pessoas = pessoas;
  
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
          this.excluir(this.pessoaSelecionado.id)
        }
      })
  }
 /**
  * exclui o registro selecionado
  * @param id 
  */
  excluir(id: number){
    this.pessoaService.excluir(id)
    .pipe(
      tap(valor => console.log(valor)),
      take(1)
    ).subscribe((pessoaId: number) => {
      this.listar();
    });

  }

   /**
 * Navega para a página de visualização passando o ID pela rota
 */
visualizar() {
  this.router.navigate(['/pessoaView', this.pessoaSelecionado.id])
}

/**
* Navega para a página de edição passando o ID pela rota
*/
editar() {
  this.router.navigate(['/pessoaEdit', this.pessoaSelecionado.id])
}

 /**
   * fecha dialogo do componente dialog-mensage
   */
  fecharDialogoItem(display){
    this.display = display
   }


}
