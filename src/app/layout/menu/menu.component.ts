import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
      this.items = [
          {
              label: 'Apoio', icon: 'null',
              items: [
                  [
                      {
                          label: 'Cadastros',
                          items: [
                            {label: 'Usuário', routerLink: ['/usuarioMain']},
                            {label: 'Pessoa Jurídica', routerLink: ['/pessoaMain']},
                            {label: 'Atributo', routerLink: ['/atributoMain']},
                        
                        ]
                      }  
                  ]
              ]
          },
          {
            label: 'Estoque', icon: 'null',
            items: [
                [
                    {
                        label: 'Estoque',
                        items: [
                        {label: 'Produtos', routerLink: ['/produtoMain']},
                        {label: 'Entradas e saídas', routerLink: ['/movimentoMain']},
                      ]
                    }  
                ]
            ]
        },
        {
            label: 'Compras', icon: 'null',
            items: [
                [
                    {
                        label: 'compras',
                        items: [
                          {label: 'Pedidos', routerLink: ['/pedidoCompraMain']},
                          {label: 'Ordens', routerLink: ['/ordemCompraMain']},
                         
                        
                      ] 
                    }   
                ]
            ]
        },
        {
            label: 'Financeiro', icon: 'null',
            items: [
                [
                    {
                        label: 'Extrato',
                        items: [
                          {label: 'Extrato', routerLink: ['/transacaoMain']},
                      ] 
                    }   
                ]
            ]
        }
        ]
      }

}
