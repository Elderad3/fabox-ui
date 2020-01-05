
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoViewComponent } from './produto-view.component';



const routes: Routes = [
  {path: '', component: ProdutoViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoViewRoutingModule { }