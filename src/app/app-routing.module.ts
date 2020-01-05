
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROTAS: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },


  { path: 'home', loadChildren: () => import('./components/home/home/home.module').then(m => m.HomeModule) },

  { path: 'usuarioEdit', loadChildren: () => import('./components/apoio/usuario/usuario-edit/usuario-edit.module').then(m => m.UsuarioEditModule) },
  { path: 'usuarioEdit/:id', loadChildren: () => import('./components/apoio/usuario/usuario-edit/usuario-edit.module').then(m => m.UsuarioEditModule) },
  { path: 'usuarioMain', loadChildren: () => import('./components/apoio/usuario/usuario-main/usuario-main.module').then(m => m.UsuarioMainModule) },
  { path: 'usuarioView', loadChildren: () => import('./components/apoio/usuario/usuario-view/usuario-view.module').then(m => m.UsuarioViewModule) },
  { path: 'usuarioView/:id', loadChildren: () => import('./components/apoio/usuario/usuario-view/usuario-view.module').then(m => m.UsuarioViewModule) },

  { path: 'pessoaEdit', loadChildren: () => import('./components/apoio/pessoa/pessoa-edit/pessoa-edit.module').then(m => m.PessoaEditModule) },
  { path: 'pessoaEdit/:id', loadChildren: () => import('./components/apoio/pessoa/pessoa-edit/pessoa-edit.module').then(m => m.PessoaEditModule) },
  { path: 'pessoaMain', loadChildren: () => import('./components/apoio/pessoa/pessoa-main/pessoa-main.module').then(m => m.PessoaMainModule) },
  { path: 'pessoaView', loadChildren: () => import('./components/apoio/pessoa/pessoa-view/pessoa-view.module').then(m => m.PessoaViewModule) },
  { path: 'pessoaView/:id', loadChildren: () => import('./components/apoio/pessoa/pessoa-view/pessoa-view.module').then(m => m.PessoaViewModule) },

  { path: 'atributoEdit', loadChildren: () => import('./components/apoio/atributo/atributo-edit/atributo-edit.module').then(m => m.AtributoEditModule) },
  { path: 'atributoEdit/:id', loadChildren: () => import('./components/apoio/atributo/atributo-edit/atributo-edit.module').then(m => m.AtributoEditModule) },
  { path: 'atributoMain', loadChildren: () => import('./components/apoio/atributo/atributo-main/atributo-main.module').then(m => m.AtributoMainModule) },

  { path: 'produtoEdit', loadChildren: () => import('./components/estoque/produto/produto-edit/produto-edit.module').then(m => m.ProdutoEditModule) },
  { path: 'produtoEdit/:id', loadChildren: () => import('./components/estoque/produto/produto-edit/produto-edit.module').then(m => m.ProdutoEditModule) },
  { path: 'produtoMain', loadChildren: () => import('./components/estoque/produto/produto-main/produto-main.module').then(m => m.ProdutoMainModule) },
  { path: 'produtoView', loadChildren: () => import('./components/estoque/produto/produto-view/produto-view.module').then(m => m.ProdutoViewModule) },
  { path: 'produtoView/:id', loadChildren: () => import('./components/estoque/produto/produto-view/produto-view.module').then(m => m.ProdutoViewModule) },

  { path: 'movimentoEdit', loadChildren: () => import('./components/estoque/movimento/movimento-edit/movimento-edit.module').then(m => m.MovimentoEditModule) },
  { path: 'movimentoEdit/:id', loadChildren: () => import('./components/estoque/movimento/movimento-edit/movimento-edit.module').then(m => m.MovimentoEditModule) },
  { path: 'movimentoMain', loadChildren: () => import('./components/estoque/movimento/movimento-main/movimento-main.module').then(m => m.MovimentoMainModule) },
  { path: 'movimentoView', loadChildren: () => import('./components/estoque/movimento/movimento-view/movimento-view.module').then(m => m.MovimentoViewModule) },
  { path: 'movimentoView/:id', loadChildren: () => import('./components/estoque/movimento/movimento-view/movimento-view.module').then(m => m.MovimentoViewModule) },

  { path: 'pedidoCompraEdit', loadChildren: () => import('./components/compras/pedido-compra/pedido-compra-edit/pedido-compra-edit.module').then(m => m.PedidoCompraEditModule) },
  { path: 'pedidoCompraEdit/:id', loadChildren: () => import('./components/compras/pedido-compra/pedido-compra-edit/pedido-compra-edit.module').then(m => m.PedidoCompraEditModule) },
  { path: 'pedidoCompraMain', loadChildren: () => import('./components/compras/pedido-compra/pedido-compra-main/pedido-compra-main.module').then(m => m.PedidoCompraMainModule) },

  { path: 'ordemCompraEdit', loadChildren: () => import('./components/compras/ordem-compra/ordem-compra-edit/ordem-compra-edit.module').then(m => m.OrdemCompraEditModule) },
  { path: 'ordemCompraEdit/:id', loadChildren: () => import('./components/compras/ordem-compra/ordem-compra-edit/ordem-compra-edit.module').then(m => m.OrdemCompraEditModule) },
  { path: 'ordemCompraMain', loadChildren: () => import('./components/compras/ordem-compra/ordem-compra-main/ordem-compra-main.module').then(m => m.OrdemCompraMainModule) },

  { path: 'transacaoMain', loadChildren: () => import('./components/financeiro/extrato/transacao-main/transacao-main.module').then(m => m.TransacaoMainModule) },




]


@NgModule({
  imports: [
    RouterModule.forRoot(ROTAS)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }