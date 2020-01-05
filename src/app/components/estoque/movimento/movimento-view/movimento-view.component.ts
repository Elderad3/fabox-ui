import { Movimento } from './../movimento.model';
import { MovimentoService } from './../movimento.service';

import { MessageService } from 'primeng/components/common/messageservice';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { tap, take } from 'rxjs/operators';
import { FormMessageService } from 'src/app/shared/mensagens/form-message.service';


@Component({
  selector: 'app-movimento-view',
  templateUrl: './movimento-view.component.html'
})
export class MovimentoViewComponent implements OnInit {

  movimento: Movimento
  titulo: string
  movimentoSelecionado: Movimento
  tipoMovimento: string

  constructor(private router: Router,
    private movimentoService: MovimentoService,
    private activatedRoute: ActivatedRoute,
    public msgForm: FormMessageService,
    private toasty: MessageService) { }

  ngOnInit() {
    this.movimento = new Movimento();
    this.activatedRoute.params.forEach((parametro: Params) => {
      let id = +parametro['id'];
      if (id) {
        this.buscarPorId(id)
        this.titulo = 'Visualizar Movimento'
      
      }
    })
  }

  /**
   * Busca entidade pelo Identificador
   * @param id 
   */
  buscarPorId(id: number) {
    this.movimentoService.buscarPorId(id).pipe(
      tap(valor => console.log(valor)),
      take(1)
    ).subscribe((movimento: Movimento) => {
      this.movimento = movimento;
    }, err => {
      this.toasty.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu o seguinte erro ao tentar buscar: ${err.message}` });
    })
  }

  /**
   * retorna para a página de listagem
   */
  voltar() {
    this.router.navigate(['movimentoMain'])
  }

}
