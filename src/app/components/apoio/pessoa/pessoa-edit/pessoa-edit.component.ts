import { ErrorService } from './../../../../core/error-handler/errors.service';
import { FormMessageService } from './../../../../shared/mensagens/form-message.service';
import { Endereco } from './../endereco.model';


import { PessoaService } from './../pessoa.service';
import { Pessoa } from '../pessoa.model';

import { MessageService } from 'primeng/components/common/messageservice';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { NgForm } from '@angular/forms';
import { tap, take, map } from 'rxjs/operators';


@Component({
  selector: 'app-pessoa-edit',
  templateUrl: './pessoa-edit.component.html'
})
export class PessoaEditComponent implements OnInit {

  pessoa: Pessoa
  endereco: Endereco
  titulo: string
  pessoaSelecionado: Pessoa
  @ViewChild("form")
  form: NgForm

  @ViewChild("enderecoForm")
  enderecoForm: NgForm
  cols: any
  enderecos: Endereco[] = []
  enderecoSelecionado: Endereco
  headerModal: string =''
  displayDialog : boolean = false

  constructor(
    private router: Router,
    private pessoaService: PessoaService,
    private activatedRoute: ActivatedRoute,
    public msgForm: FormMessageService,
    private toasty: MessageService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.pessoa = new Pessoa();
    this.endereco = new Endereco
    this.carregarColunasItens()

    this.titulo = 'Cadastro Pessoa Jurídica'
    this.activatedRoute.params.forEach((parametro: Params) => {
      let id = +parametro['id'];
      if (id) {
        this.buscarPessoaPorId(id)
        this.titulo = 'Editar Pessoa Jurídica'
      
      }
    })
  }
  /**
   * Busca entidade pelo Identificador
   * @param id 
   */
  buscarPessoaPorId(id: number) {
    this.pessoaService.buscarPorId(id).pipe(
      take(1)
    ).subscribe((pessoa: Pessoa) => {
      this.pessoa = pessoa;
      console.log(this.pessoa)
    }, err => {
      this.errorService.handle(err)
    }) 
  }

  /**
   * Envia para o service para realizar o salvamento ou atualização da entidade
   */
  salvarPessoa() {
    this.pessoaService.salvar(this.pessoa).pipe(
      tap(valor => console.log(valor)),
      take(1),
    ).subscribe((pessoa: Pessoa) => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `${pessoa.nome} foi salvo com sucesso` });
    }, err => {
      this.errorService.handle(err)
    })
  }
  /**
   * retorna para a página de listagem
   */
  voltar() {
    this.router.navigate(['pessoaMain'])
    this.form.resetForm()
  }

  /**---------------------------------------------------------------------------------------------------------------------------------------------
   * Métodos relacionados a tabview de endereços
   * --------------------------------------------------------------------------------------------------------------------------------------------

  /**
   * carrega colunas da tabela de itens 
   */
  carregarColunasItens() {
    this.cols = [
      { field: 'cidade', header: 'Cidade', width: '30%' },
      // { field: 'uf', header: 'Estado', width: '20%' },
      // { field: 'complemento', header: 'complemento' },
    ];
  }

  /**
 * preparar insersão de item na lista de item
 */
  prepararIncersaoItem() {
    this.endereco = { 
      id: null, cidade: null, 
      //uf: null, cep: null, 
      //complemento: null , 
      pessoaId: this.pessoa.id };
    this.enderecoForm.reset()
    this.headerModal = "Inserir Endereço"
    this.displayDialog = true
  }
  /**
* insere item na lista de itens
*/
  inserirItem() {
    const resultado = this.pessoa.enderecos.indexOf(this.enderecoSelecionado)
    if (resultado >= 0) {
      this.pessoa.enderecos.splice(this.pessoa.enderecos.indexOf(this.enderecoSelecionado), 1, this.endereco)
    } else {
      this.pessoa.enderecos.push(this.endereco)
    }
    this.displayDialog = false
  }

  /**
* edita item selecionaado da listagem
*/
  editarItem() {
    this.endereco = {
      id: this.enderecoSelecionado.id, cidade: this.enderecoSelecionado.cidade, 
      //uf: this.enderecoSelecionado.uf,
      //cep: this.enderecoSelecionado.cep, 
     // complemento: this.enderecoSelecionado.complemento,
       pessoaId: this.enderecoSelecionado.pessoaId
    };
    this.headerModal = "Editar Item"
    this.displayDialog = true
  }

  /**
* remove item selecionado da listagem
*/
  removerItem() {
    this.pessoa.enderecos.splice(this.pessoa.enderecos.indexOf(this.enderecoSelecionado), 1)
  }

  /**
* cancela inserção ou edição no dialog
*/
  cancelar() {
    this.enderecoForm.reset()
    this.displayDialog = false
  }

}
