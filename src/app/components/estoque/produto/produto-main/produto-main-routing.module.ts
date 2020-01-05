
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoMainComponent } from './produto-main.component';


const routes: Routes = [
  {path: '', component: ProdutoMainComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoMainRoutingModule { }