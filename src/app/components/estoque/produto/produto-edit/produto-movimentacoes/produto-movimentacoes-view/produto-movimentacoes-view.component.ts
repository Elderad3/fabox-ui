import { Component, OnInit, Input } from '@angular/core';
import { ProdutoMovimentacoesService } from './produto-movimentacoes.service';
import { MessageService } from 'primeng/api';
import { tap, take } from 'rxjs/operators';
import { Produto } from '../../../produto.model';
import { Movimento } from 'src/app/components/estoque/movimento/movimento.model';

@Component({
  selector: 'app-produto-movimentacoes-view',
  templateUrl: './produto-movimentacoes-view.component.html'
})
export class ProdutoMovimentacoesViewComponent implements OnInit {

 @Input() produto: Produto
  movimentos: Movimento[]=[]
  cols: any

  constructor(private produtoMovimentoService: ProdutoMovimentacoesService,
    private toasty: MessageService) { }

  ngOnInit() {
    this.carregarColunasItens()
    this.carregarMovimentos(this.produto.id)
  }

  /**
 * carrega movimentos pelo id do produto
 * @param id 
 */
carregarMovimentos(id:number){
  this.produtoMovimentoService.carregarMovimentos(id).pipe(
    take(1))
    .subscribe((movimentos: Movimento[]) => {
    this.movimentos = movimentos;
  },err => {
    this.toasty.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu o seguinte erro ao tentar buscar: ${err.message}` });
  } )
}

  /**
   * carrega colunas da tabela de movimentos
   */
  carregarColunasItens() {
    this.cols = [
      { field: 'dataMovimento', header: 'Data do movimento' },
      { field: 'quantidade', header: 'Quantidade' }, 
      { field: 'custoUnitario', header: 'Custo Unitário' }, 
      { field: 'custoTotal', header: 'Custo Total' },
      { field: 'operacao.nome', header: 'Operação' }, 
    ];
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




}
