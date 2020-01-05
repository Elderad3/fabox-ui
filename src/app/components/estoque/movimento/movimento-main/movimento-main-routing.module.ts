
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovimentoMainComponent } from './movimento-main.component';


const routes: Routes = [
  {path: '', component: MovimentoMainComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentoMainRoutingModule { }