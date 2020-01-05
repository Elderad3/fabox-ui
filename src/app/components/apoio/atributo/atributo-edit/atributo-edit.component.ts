import { ErrorService } from './../../../../core/error-handler/errors.service';
import { FormMessageService } from './../../../../shared/mensagens/form-message.service';

import { AtributoService } from './../atributo.service';
import { Atributo } from '../atributo.model';

import { MessageService } from 'primeng/components/common/messageservice';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { NgForm } from '@angular/forms';
import { tap, take, map } from 'rxjs/operators';
import { Esquema } from '../esquema.model';
import { EsquemaService } from '../esquema.service';


@Component({
  selector: 'app-atributo-edit',
  templateUrl: './atributo-edit.component.html'
})
export class AtributoEditComponent implements OnInit {

  atributo: Atributo
  titulo: string
  atributoSelecionado: Atributo
  @ViewChild("form")
  form: NgForm
  cols: any
  headerModal: string = ''
  displayDialog: boolean = false

  esquemas: Esquema[] = []


  constructor(
    private router: Router,
    private atributoService: AtributoService,
    private activatedRoute: ActivatedRoute,
    private esquemaService: EsquemaService,
    public msgForm: FormMessageService,
    private toasty: MessageService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.atributo = new Atributo();
    this.carregarEsquemas()
    this.titulo = 'Cadastro Atributo'
    this.activatedRoute.params.forEach((parametro: Params) => {
      let id = +parametro['id'];
      if (id) {
        this.buscarAtributoPorId(id)
        this.titulo = 'Editar Atributo'

      }
    })
  }
  /**
   * Busca entidade pelo Identificador
   * @param id 
   */
  buscarAtributoPorId(id: number) {
    this.atributoService.buscarPorId(id).pipe(
      take(1)
    ).subscribe((atributo: Atributo) => {
      this.atributo = atributo;
    }, err => {
      this.errorService.handle(err)
    })
  }

  /**
   * Envia para o service para realizar o salvamento ou atualização da entidade
   */
  salvarAtributo() {
    this.atributoService.salvar(this.atributo).pipe(
      tap(valor => console.log(valor)),
      take(1),
    ).subscribe((atributo: Atributo) => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `${atributo.nome} foi salvo com sucesso` });
    }, err => {
      this.errorService.handle(err)
    })
  }

  /**
  * carrega esquemas
  */
  carregarEsquemas() {
    this.esquemaService.listar().pipe( 
      take(1)
    ).subscribe((esquemas: Esquema[]) => {
      this.esquemas = esquemas;
      console.log("passou por aqui")
    }, err => {
      this.errorService.handle(err)
    })
  }


  /**
   * retorna para a página de listagem
   */
  voltar() {
    this.router.navigate(['atributoMain'])
    this.form.resetForm()
  }
}
