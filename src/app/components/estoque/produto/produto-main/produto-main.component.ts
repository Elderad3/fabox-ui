import { ErrorService } from 'src/app/core/error-handler/errors.service';
import { Message } from 'primeng/components/common/message';
import { MessageService } from 'primeng/components/common/messageservice';
import { ProdutoService } from './../produto.service';

import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { tap, take } from 'rxjs/operators';
import { Produto } from '../produto.model';

@Component({
  selector: 'app-produto-main',
  templateUrl: './produto-main.component.html'
})
export class ProdutoMainComponent implements OnInit {

  titulo: string = "Produtos"
  produtos: Produto[] = []
  produtoSelecionado: Produto
  display: boolean = false
  msgContent: string

  msgs: Message[] = [];
  cols: any

  constructor(private router: Router,
    private produtoService: ProdutoService,
    private confirmationService: ConfirmationService,
    private toasty: MessageService,
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
      { field: 'id', header: 'Id', width: '5%',  },
      { field: 'sku', header: 'SKU', width: '7%',},
      { field: 'nome', header: 'Nome',tipo:'normal' },
      { field: 'estoqueAtual', header: 'Estoque Atual',},
      { field: 'custoUnitarioAtual', header: 'Custo UN. Atual',tipo:'dinheiro' },
      { field: 'custoTotalAtual', header: 'Custo Total Atual',tipo:'dinheiro' },
      { field: 'isAtivo', header: 'Ativo', width: '8%' ,},
      { field: 'isBloqueado', header: 'Bloqueado', width: '10%', },  
    ];
  }

  /**
   * Lista todas as propriedades existentes
   */
  todos() {
    this.produtoService.listar().pipe(
      tap(valor => console.log(valor)),
      take(1))
      .subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
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
    if (this.produtoSelecionado.isAtivo == "Sim") {
      this.msgContent = 'Este produto não pode ser excluído(a) pois está ativo'
      this.display = true 
    } else {

      this.confirmationService.confirm({
        message: 'Tem certeza de que deseja excluir?',
        accept: () => {
          this.excluir(this.produtoSelecionado.id);
        }
      })
    }
  }
  /**
   * Envia comando para o service para remover uma propriedade
   * @param id 
   */
  excluir(id: number){
    this.produtoService.excluir(id).pipe(
      tap(valor => console.log(valor)),
      take(1))
      .subscribe((produtoId: number) => {
      this.todos();
    })
  }

  /**
* Envia comando para o service para desativar uma propriedade
*/
  desativar() {
    this.produtoSelecionado.isAtivo = "Não"
    this.produtoService.salvar(this.produtoSelecionado).pipe(
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
    this.produtoSelecionado.isAtivo = "Sim"
    this.produtoService.salvar(this.produtoSelecionado).pipe(
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
  this.router.navigate(['/produtoView', this.produtoSelecionado.id])
}

/**
* Navega para a página de edição passando o ID pela rota
*/
editar() {
  this.router.navigate(['/produtoEdit', this.produtoSelecionado.id])
}

 /**
   * fecha dialogo do componente dialog-mensage
   */
  fecharDialogoItem(display){
    this.display = display
   }


}
