
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtributoMainComponent } from './atributo-main.component';


const routes: Routes = [
  {path: '', component: AtributoMainComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtributoMainRoutingModule { }