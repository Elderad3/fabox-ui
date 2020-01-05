
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoaViewComponent } from './pessoa-view.component';



const routes: Routes = [
  {path: '', component: PessoaViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaViewRoutingModule { }