
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovimentoViewComponent } from './movimento-view.component';



const routes: Routes = [
  {path: '', component: MovimentoViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentoViewRoutingModule { }