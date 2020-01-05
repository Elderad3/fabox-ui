
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioMainComponent } from './usuario-main.component';


const routes: Routes = [
  {path: '', component: UsuarioMainComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioMainRoutingModule { }