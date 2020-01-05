
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioViewComponent } from './usuario-view.component';



const routes: Routes = [
  {path: '', component: UsuarioViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioViewRoutingModule { }