import { HttpClient } from '@angular/common/http';
import { TransacaoGerente } from './../transacao.gerente';
import { FormMessageService } from './../../../../shared/mensagens/form-message.service';
import { ErrorService } from 'src/app/core/error-handler/errors.service';
import { Message } from 'primeng/components/common/message';
import { MessageService } from 'primeng/components/common/messageservice';
import { TransacaoService } from './../transacao.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { tap, take } from 'rxjs/operators';
import { Transacao } from '../transacao.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transacao-main',
  templateUrl: './transacao-main.component.html'
})
export class TransacaoMainComponent implements OnInit {

  titulo: string = "Transações"
  transacao: Transacao
  transacaos: Transacao[] = []
  transacaoSelecionado: Transacao
  display: boolean = false
  msgContent: string
  
  @ViewChild("transacaoForm")
  transacaoForm: NgForm
  headerModal: string =''
  displayDialog : boolean = false

  headerModal2: string =''
  displayDialog2: boolean = false
  uploadedFiles: any[] = [];

  msgs: Message[] = [];
  cols: any
  
  constructor(private router: Router,
    private http: HttpClient,
    private transacaoService: TransacaoService,
    private transacaoGerente: TransacaoGerente,
    private confirmationService: ConfirmationService,
    private errorService:ErrorService,
    public msgForm: FormMessageService) { }

  ngOnInit() {
    this.transacao = new Transacao
    this.todos();
    this.carregarTabela()
  }

  /**
   * Carrega propriedades da da tabela
   */
  carregarTabela() {
    this.cols = [
      { field: 'id', header: 'Id', width: '5%',  },
      { field: 'conta', header: 'Conta'},
      { field: 'data', header: 'Data',tipo:'normal' },
      { field: 'descricao', header: 'Descrição',},
      { field: 'categoria.nome', header: 'Categoria'},  
      { field: 'valor', header: 'Valor',tipo:'dinheiro' },
     
    
    ];
  }

  /**
   * Lista todas as propriedades existentes
   */
  todos() {
    this.transacaoService.listar().pipe(
      tap(valor => console.log(valor)),
      take(1))
      .subscribe((transacaos: Transacao[]) => {
      this.transacaos = transacaos;
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
          this.excluir(this.transacaoSelecionado.id);
        }
      })
  }
  /**
   * Envia comando para o service para remover uma propriedade
   * @param id 
   */
  excluir(id: number){
    this.transacaoService.excluir(id).pipe(
      tap(valor => console.log(valor)),
      take(1))
      .subscribe((transacaoId: number) => {
      this.todos();
    })
  }

  /**
* Envia comando para o service para desativar uma propriedade
*/
  desativar() {
    this.transacaoSelecionado.isAtivo = "Não"
    this.transacaoService.salvar(this.transacaoSelecionado).pipe(
      take(1))
      .subscribe(() => {
      this.msgContent = 'Desativação realizada'
      this.display = true
    });

  }

  /**
* Envia comando para o service para ativar uma propriedade
*/
  ativar() {
    this.transacaoSelecionado.isAtivo = "Sim"
    this.transacaoService.salvar(this.transacaoSelecionado).pipe(
      take(1)) 
      .subscribe(() => {
      this.msgContent = 'Ativação realizada'
      this.display = true
    });
  }

   /**
 * Navega para a página de visualização passando o ID pela rota
 */
visualizar() {
  this.router.navigate(['/transacaoView', this.transacaoSelecionado.id])
}

/**
* Navega para a página de edição passando o ID pela rota
*/
editar() {
  this.router.navigate(['/transacaoEdit', this.transacaoSelecionado.id])
}

 /**
   * fecha dialogo do componente dialog-mensage
   */
  fecharDialogoItem(display){
    this.display = display
   }

 /**---------------------------------------------------------------------------------------------------------------------------------------------
   * Métodos relacionados a edição
   * --------------------------------------------------------------------------------------------------------------------------------------------

 
  /**
 * preparar insersão de item na lista de item
 */
  prepararIncersaoItem() {
    this.transacao = { 
      id: null, 
      conta: null,
      codigo:  null,
      tipo: null,
      valor: null,
      data:  null, 
      categoria:  null,
      descricao:  null,
      isAtivo:  null};

    this.transacaoForm.reset()
    this.headerModal = "Inserir Transação"
    this.displayDialog = true
  }
  /**
* insere item na lista de itens
*/
  inserirItem() {
    const resultado = this.transacaos.indexOf(this.transacaoSelecionado)
    if (resultado >= 0) {
      this.transacaos.splice(this.transacaos.indexOf(this.transacaoSelecionado), 1, this.transacao)
    } else {
      this.transacaos.push(this.transacao)
    }
    this.displayDialog = false
  }

  /**
* edita item selecionaado da listagem
*/
  editarItem() {
    this.transacao = {
      id: this.transacaoSelecionado.id, 
      conta: this.transacaoSelecionado.conta,
      codigo: this.transacaoSelecionado.codigo,
      tipo: this.transacaoSelecionado.tipo,
      valor: this.transacaoSelecionado.valor,
      data: this.transacaoSelecionado.data, 
      categoria: this.transacaoSelecionado.categoria,
      descricao: this.transacaoSelecionado.descricao,
      isAtivo: this.transacaoSelecionado.isAtivo
    };
    this.headerModal = "Editar Item"
    this.displayDialog = true
  }

  /**
* remove item selecionado da listagem
*/
  removerItem() {
    this.transacaos.splice(this.transacaos.indexOf(this.transacaoSelecionado), 1)
  }

  /**
* cancela inserção ou edição no dialog
*/
  cancelar() {
    this.transacaoForm.reset()
    this.displayDialog = false
  }

  /**
 * preparar insersão de item na lista de item
 */
prepararIncersaoExtrato() {
  this.headerModal2 = "Carregar Extrato"
  this.displayDialog2 = true
}

onUpload(event) {

const arquivo = event.target.files[0]
console.log( event.target.files[0])
const formData = new FormData()
formData.append('arquivo', arquivo);
this.http.post('http://localhost:8080/transacao', formData).subscribe( resposta => console.log('ok'))
  
  
 
}

}
