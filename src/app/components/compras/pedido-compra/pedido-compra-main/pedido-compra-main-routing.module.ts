
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoCompraMainComponent } from './pedido-compra-main.component';


const routes: Routes = [
  {path: '', component: PedidoCompraMainComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoCompraMainRoutingModule { }