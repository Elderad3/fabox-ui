
import { Pessoa } from './../pessoa.model';
import { Endereco } from './../endereco.model';
import { PessoaService } from './../pessoa.service';
import { MessageService } from 'primeng/components/common/messageservice';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { tap, take } from 'rxjs/operators';
import { FormMessageService } from 'src/app/shared/mensagens/form-message.service';
import { ErrorService } from 'src/app/core/error-handler/errors.service';


@Component({
  selector: 'app-pessoa-view',
  templateUrl: './pessoa-view.component.html'
})
export class PessoaViewComponent implements OnInit {

  pessoa: Pessoa
  titulo: string
  pessoaSelecionado: Pessoa
  tipoPessoa: string

  cols: any
  endereco: Endereco
  contador: number = 0
  ativo: boolean = true
  bloqueado: boolean = false


  constructor(private router: Router,
    private pessoaService: PessoaService,
    private activatedRoute: ActivatedRoute,
    public msgForm: FormMessageService,
    private toasty: MessageService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.endereco = new Endereco
    this.carregarColunasItens()
    this.pessoa = new Pessoa();
    this.activatedRoute.params.forEach((parametro: Params) => {
      let id = +parametro['id'];
      if (id) {
        this.buscarPorId(id)
        this.titulo = 'Visualizar Pessoa Jurídica/Física'
      
      }
    })
  }

  /**
   * Busca entidade pelo Identificador
   * @param id 
   */
  buscarPorId(id: number) {
    this.pessoaService.buscarPorId(id).pipe(
      tap(valor => console.log(valor)),
      take(1)
    ).subscribe((pessoa: Pessoa) => {
      this.pessoa = pessoa;
    }, err => {
     this.errorService.handle(err);
    })
  }



  
  //Métodos referentes aos itens da tabela do componente -----------------------------------------------------------------------------------

  /**
   * carrega colunas da tabela de itens 
   */
  carregarColunasItens() {
    this.cols = [
      { field: 'id', header: 'Código', width: '5%' },
      { field: 'cidade', header: 'Cidade', width: '30%' },
      { field: 'uf', header: 'Estado', width: '20%' },
      { field: 'complemento', header: 'complemento' },
    ];
  }

  /**
   * retorna para a página de listagem
   */
  voltar() {
    this.router.navigate(['pessoaMain'])
  }

}
